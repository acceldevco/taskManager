import { useState } from "react";

export const HookButton = ({
  children,
  type = "submit",
  fun = () => {},
  id
}: any) => {
  var [load, setload] = useState<any>(0);
  return (
    <button
      id={id}
      style={{
        display: "contents",
      }}
      type={type}
      onClick={async (e) => {
        e.preventDefault();
        setload(1);
        // console.log(e);

        await fun(e.target.form).then(() => {
          setload(0);
        });
      }}
    >
      {/* {children} */}
      {typeof children === "function" ? children(load) : children}
    </button>
  );
};

// export const HookButton = ;
