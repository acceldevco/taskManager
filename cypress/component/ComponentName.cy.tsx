// // // describe('ComponentName.cy.tsx', () => {
// // //   // it('playground', () => {
// // //   //   // cy.mount()
// // //   // })
// // // })





// // /// <reference types="cypress" />
// // import React from "react";
// // import TaskBoard from "@/components/addbadge";

// // describe("🧩 TaskBoard Component", () => {
// //   const mockColumns = [
// //     {
// //       id: "col1",
// //       title: "در حال انجام",
// //       tasks: [{ id: "t1", title: "تسک شماره ۱" }],
// //     },
// //     {
// //       id: "col2",
// //       title: "انجام‌شده",
// //       tasks: [],
// //     },
// //   ];

// //   it("باید ستون‌ها و تسک‌ها را به درستی نمایش دهد", () => {
// //     cy.mount(<TaskBoard columns={mockColumns} />);
// //     cy.get("[data-cy=column]").should("have.length", 2);
// //     cy.get("[data-cy=task]").should("contain.text", "تسک شماره ۱");
// //   });

// //   it("باید هنگام جابجایی تسک تابع onMoveTask را صدا بزند", () => {
// //     const onMoveTask = cy.stub().as("moveHandler");
// //     cy.mount(<TaskBoard columns={mockColumns} onMoveTask={onMoveTask} />);

// //     const dataTransfer = new DataTransfer();

// //     // شبیه‌سازی drag & drop
// //     cy.get("[data-cy=task]").first().trigger("dragstart", { dataTransfer });
// //     cy.get("[data-cy=column]").eq(1).trigger("drop", { dataTransfer });

// //     cy.get("@moveHandler").should("have.been.calledWith", "t1", "col2");
// //   });

// //   it("باید امکان اضافه کردن تسک‌های بیشتر را داشته باشد", () => {
// //     const extended = [
// //       ...mockColumns,
// //       { id: "col3", title: "برنامه‌ریزی", tasks: [] },
// //     ];
// //     cy.mount(<TaskBoard columns={extended} />);
// //     cy.get("[data-cy=column]").should("have.length", 3);
// //   });
// // });


////////////////////////////////////////////////////////////////////////////////////////////



// /// <reference types="cypress" />
// import React from "react";
// import AddBadge from "@/components/addbadge";

// // چون Cypress محیط fetch ندارد، باید آن را mock کنیم:
// beforeEach(() => {
//   cy.stub(window, "fetch").resolves({
//     ok: true,
//     json: cy.stub().resolves({}),
//   } as any);
// });

// describe("🏷️ AddBadge Component", () => {
//   it("باید input و دکمه را رندر کند", () => {
//     cy.mount(<AddBadge />);
//     cy.get("input[placeholder='Add a name']").should("exist");
//     cy.contains("button", "Add").should("exist");
//   });

//   it("باید با وارد کردن نام و کلیک Add آن را به لیست اضافه کند", () => {
//     cy.mount(<AddBadge />);

//     cy.get("input").type("علی");
//     cy.contains("button", "Add").click();

//     // چک کن که badge اضافه شده
//     cy.get("span").should("contain.text", "علی");

//     // چک کن که input خالی شده
//     cy.get("input").should("have.value", "");
//   });

//   it("باید بتواند چند نام اضافه کند و همه نمایش داده شوند", () => {
//     cy.mount(<AddBadge />);
//     const names = ["علی", "سارا", "رضا"];

//     names.forEach((name) => {
//       cy.get("input").type(name);
//       cy.contains("button", "Add").click();
//     });

//     cy.get("span").should("have.length", 3);
//     cy.get("span").eq(1).should("contain.text", "سارا");
//   });

//   it("نباید نام تکراری را اضافه کند", () => {
//     cy.mount(<AddBadge />);
//     cy.get("input").type("علی");
//     cy.contains("button", "Add").click();
//     cy.get("input").type("علی");
//     cy.contains("button", "Add").click();

//     cy.get("span").should("have.length", 1);
//   });

//   it("باید بتواند badge را حذف کند", () => {
//     cy.mount(<AddBadge />);
//     cy.get("input").type("مینا");
//     cy.contains("button", "Add").click();

//     cy.get("button").contains("×").click();
//     cy.get("span").should("not.exist");
//   });

//   it("باید بتواند با Enter هم نام اضافه کند", () => {
//     cy.mount(<AddBadge />);
//     cy.get("input").type("حسین{enter}");
//     cy.get("span").should("contain.text", "حسین");
//   });

//   it("باید هنگام ارسال، دکمه را در حالت Loading قرار دهد", () => {
//     // برای تست حالت async و loading
//     const slowFetch = cy.stub(window, "fetch").callsFake(
//       () =>
//         new Promise((resolve) => {
//           setTimeout(() => {
//             resolve({
//               ok: true,
//               json: () => Promise.resolve({}),
//             });
//           }, 500);
//         })
//     );

//     cy.mount(<AddBadge />);
//     cy.get("input").type("نیما");
//     cy.contains("button", "Add").click();

//     cy.contains("button", "Adding...").should("exist");
//     cy.wrap(slowFetch).should("have.been.called");
//   });
// });


//////////////////////////////////////////////////////////////////





/// <reference types="cypress" />
import React from "react";
import AddBadge from "@/components/addbadge";

describe("🏷️ AddBadge Component", () => {
  beforeEach(() => {
    // Stub عمومی برای بیشتر تست‌ها
    cy.stub(window, "fetch").resolves({
      ok: true,
      json: cy.stub().resolves({}),
    } as any);
  });

  it("باید input و دکمه را رندر کند", () => {
    cy.mount(<AddBadge />);
    cy.get("input[placeholder='Add a name']").should("exist");
    cy.contains("button", "Add").should("exist");
  });

  it("باید با وارد کردن نام و کلیک Add آن را به لیست اضافه کند", () => {
    cy.mount(<AddBadge />);
    cy.get("input").type("علی");
    cy.contains("button", "Add").click();
    cy.get("span").should("contain.text", "علی");
  });

  it("باید بتواند چند نام اضافه کند", () => {
    cy.mount(<AddBadge />);
    ["علی", "سارا"].forEach((name) => {
      cy.get("input").type(name);
      cy.contains("button", "Add").click();
    });
    cy.get("span").should("have.length", 2);
  });

  it("نباید نام تکراری را اضافه کند", () => {
    cy.mount(<AddBadge />);
    cy.get("input").type("علی");
    cy.contains("button", "Add").click();
    cy.get("input").type("علی");
    cy.contains("button", "Add").click();
    cy.get("span").should("have.length", 1);
  });

  it("باید بتواند badge را حذف کند", () => {
    cy.mount(<AddBadge />);
    cy.get("input").type("مینا");
    cy.contains("button", "Add").click();
    cy.get("button").contains("×").click();
    cy.get("span").should("not.exist");
  });

  it("باید بتواند با Enter هم نام اضافه کند", () => {
    cy.mount(<AddBadge />);
    cy.get("input").type("حسین{enter}");
    cy.get("span").should("contain.text", "حسین");
  });

  it("باید هنگام ارسال، دکمه را در حالت Loading قرار دهد", () => {
    // ابتدا stub قبلی را حذف می‌کنیم
    (window.fetch as any).restore?.();

    // حالا stub جدید و کندتر می‌سازیم
    const slowFetch = cy.stub(window, "fetch").callsFake(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              ok: true,
              json: () => Promise.resolve({}),
            });
          }, 400);
        })
    );

    cy.mount(<AddBadge />);
    cy.get("input").type("نیما");
    cy.contains("button", "Add").click();

    // در این فاصله باید نوشته‌ی دکمه تغییر کند
    cy.contains("button", "Adding...").should("exist");

    // و بعد از مدتی دوباره برگردد
    cy.wait(500);
    cy.contains("button", "Add").should("exist");

    cy.wrap(slowFetch).should("have.been.called");
  });
});
