# Libraries

- This document contains information related to the libraries of the project, including the reasons for selection, configuration methods, and more.

## 1. vanilla-extract

- Chosen for its zero-runtime CSS in TypeScript, enhancing performance compared to runtime CSS.

### 1-1. stylex

- [stylex](https://stylexjs.com) was also considered as an option, but it requires using Babel instead of SWC, which does not align with the project’s build tool preferences and performance objectives.
- Setup for Next.js was too verbose and complex(since it's using babel)
- Stylex is a relatively new library compared to vanilla-extract, and it has significantly fewer downloads. which can leads to less community support and potential issues.
- Despite some downsides, `Stylex` offers several advantages. For instance, it utilizes the Atomic CSS methodology with out of the box support(Not like tailwind css, Programmers don't have to use predefined classes), generating minimal CSS rules that can be combined to create various styles. This approach reduces code duplication, optimizes performance, and shortens CSS loading times.
- Although stylex is worth considering for future use, vanilla-extract is currently more stable and widely used, making it a safer choice.