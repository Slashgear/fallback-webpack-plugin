import fs from "fs";
import { Compiler } from "webpack";

class FallbackWebpackPlugin {
  private currentSubdirectoryName: string;
  private detectPattern: RegExp;
  private replacePattern: RegExp;

  /**
   * @param branchDirectory Directory to scan in which it should replace or fallback path
   * @param currentSubdirectoryName Current subdir used in your implementation
   * @param fallBackDirectoryName fallback directory name for your default implementation
   */
  constructor(
    branchDirectory: string,
    currentSubdirectoryName: string,
    fallBackDirectoryName = "default"
  ) {
    this.currentSubdirectoryName = currentSubdirectoryName;
    this.detectPattern = new RegExp(
      `/${branchDirectory}/${fallBackDirectoryName}/`
    );
    this.replacePattern = new RegExp(`/${fallBackDirectoryName}/`);
  }

  apply(compiler: Compiler): void {
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

export = FallbackWebpackPlugin;
