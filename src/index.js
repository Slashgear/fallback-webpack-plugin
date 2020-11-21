const fs = require("fs");

class FallbackWebpackPlugin {
  constructor(
    branchDirectory,
    currentSubdirectoryName,
    fallBackDirectoryName = "default"
  ) {
    this.currentSubdirectoryName = currentSubdirectoryName;
    this.detectPattern = new RegExp(
      `\/${branchDirectory}\/${fallBackDirectoryName}\/`
    );
    this.replacePattern = new RegExp(`\/${fallBackDirectoryName}\/`);
  }

  apply(compiler) {
    compiler.hooks.normalModuleFactory.tap("FallbackWebpackPlugin", (nmf) => {
      nmf.hooks.afterResolve.tap("FallbackWebpackPlugin", (result) => {
        if (!result) return;

        // if the variant exists for the current customer
        if (this.detectPattern.test(result.resource)) {
          const customerResource = result.resource.replace(
            this.replacePattern,
            `/${this.currentSubdirectoryName}/`
          );
          if (fs.existsSync(customerResource)) {
            // I replace the resolved path by the customer path
            result.resource = customerResource;
          }
        }

        return result;
      });
    });
  }
}

module.exports = FallbackWebpackPlugin;
