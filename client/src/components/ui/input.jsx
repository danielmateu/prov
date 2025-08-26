// import * as React from "react"

// import { cn } from "@/lib/utils"

// const Input = React.forwardRef(({ className, type, ...props }, ref) => {
//   return (
//     (<input
//       type={type}
//       className={cn(
//         "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 blindcolor:placeholder:text-slate-400 dark:placeholder:text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2  focus:border-transparent transition-all",
//         className
//       )}
//       ref={ref}
//       {...props} />)
//   );
// })
// Input.displayName = "Input"

// export { Input }

import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    (<input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 blindcolor:placeholder:text-slate-400 dark:placeholder:text-slate-500 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:border-transparent dark:focus:ring-cyan-400/70 dark:focus:border-cyan-500/60 dark:focus:ring-opacity-70 dark:focus:shadow-[0_0_5px_0px_rgba(34,211,238,0.2)] transition-all",
        className
      )}
      ref={ref}
      {...props} />)
  );
})
Input.displayName = "Input"

export { Input }