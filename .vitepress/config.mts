import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "南院参考信息",
  description: "",
  base: "/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "关于", link: "/about" },
    ],

    // sidebar: [
    //   {
    //     text: "Examples",
    //     items: [
    //       { text: "Markdown Examples", link: "/markdown-examples" },
    //       { text: "Runtime API Examples", link: "/api-examples" },
    //     ],
    //   },
    // ],

    socialLinks: [
      { icon: "github", link: "https://github.com/wzj042/nfu-cn-ref" },
    ],
  },
     markdown: {
        config: md => {
            // Save the original renderer and provide a fallback to prevent runtime errors.
            const _super = md.renderer.rules.image || function(tokens, idx, options, env, self) {
                return self.renderToken(tokens, idx, options);
            };

            md.renderer.rules.image = function (tokens, idx, options, env, self) {
                const token = tokens[idx];
                const src = token.attrGet('src');
                const title = token.attrGet('title');
                const alt = self.renderInlineAsText(token.children ?? [], options, env);

                // If a title attribute exists, wrap the image in a <figure> element.
                if (title) {
                    // It's a good practice to escape attributes to prevent XSS vulnerabilities.
                    const escapedSrc = md.utils.escapeHtml(src ?? "");
                    const escapedAlt = md.utils.escapeHtml(alt ?? "");
                    const escapedTitle = md.utils.escapeHtml(title ?? "");

                    return `
                        </p>
                          <figure style="text-align: center;">
                              <img style="display: block; margin: 0 auto;" src="${escapedSrc}" alt="${escapedAlt}" title="${escapedTitle}" />
                              <figcaption>
                                  <small>${escapedTitle}</small>
                              </figcaption>
                          </figure><p>
                        `;
                }

                // Otherwise, call the original renderer.
                return _super(tokens, idx, options, env, self);
            };
        }
    },
});
