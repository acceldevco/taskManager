// app/api/prisma-schema/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";        // ✅ فقط این درست قبول میشه
export const dynamic = "force-dynamic"; 

const prismaToInputType = (type: string) => {
  switch (type) {
    case "String": return "text";
    case "Int":
    case "Float":
    case "Decimal": return "number";
    case "Boolean": return "checkbox";
    case "DateTime": return "date";
    case "Json": return "textarea";
    default: return "select";
  }
};

async function extractSchemaDetails() {
  const fs = await import("fs");
  const path = await import("path");
  const { getDMMF } = await import("@prisma/internals");

  // مسیر درست
  const schemaPath = path.join(process.cwd(), "prisma/schema.prisma");
  const schema = fs.readFileSync(schemaPath, "utf-8");

  const dmmf = await getDMMF({ datamodel: schema });

  const modelMap = new Map();
  dmmf.datamodel.models.forEach((model: any) => modelMap.set(model.name, model));

  const buildModel = (modelName: string, visited = new Set()) => {
    if (visited.has(modelName)) return { circular: true };
    visited.add(modelName);

    const model = modelMap.get(modelName);
    if (!model) return null;

    const result: any = {};
    for (const field of model.fields) {
      if (field.relationName && modelMap.has(field.type)) {
        result[field.name] = buildModel(field.type, new Set(visited));
      } else {
        result[field.name] = {
          inputType: prismaToInputType(field.type),
          prismaType: field.type,
          isEnum: dmmf.datamodel.enums.some((e: any) => e.name === field.type),
          isRequired: field.isRequired,
        };
      }
    }
    return result;
  };

  const allModels: Record<string, any> = {};
  for (const model of dmmf.datamodel.models) {
    allModels[model.name] = buildModel(model.name);
  }

  const allEnums: Record<string, string[]> = {};
  for (const e of dmmf.datamodel.enums) {
    allEnums[e.name] = e.values.map((v: any) => v.name);
  }

  return { models: allModels, enums: allEnums };
}

export async function GET() {
  try {
    const data = await extractSchemaDetails();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
