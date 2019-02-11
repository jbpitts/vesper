/**
 * Generates a new project with Vesper.
 */
export declare class InitCommand {
    command: string;
    describe: string;
    builder(yargs: any): any;
    handler(argv: any): Promise<void>;
    /**
     * Gets contents of the ormconfig file.
     */
    protected static getOrmConfigTemplate(database: string): string;
    /**
     * Gets contents of the ormconfig file.
     */
    protected static getTsConfigTemplate(): string;
    /**
     * Gets contents of the .gitignore file.
     */
    protected static getGitIgnoreFile(): string;
    /**
     * Gets contents of the user entity.
     */
    protected static getUserEntityTsTemplate(database: string): string;
    /**
     * Gets contents of the user entity.
     */
    protected static getUserEntityJsTemplate(database: string): string;
    /**
     * Gets contents of the photo entity.
     */
    protected static getPhotoEntityTsTemplate(database: string): string;
    /**
     * Gets contents of the photo entity.
     */
    protected static getPhotoEntityJsTemplate(database: string): string;
    /**
     * Gets contents of the user controller file.
     */
    protected static getUserControllerTsTemplate(): string;
    /**
     * Gets contents of the user controller file.
     */
    protected static getUserControllerJsTemplate(): string;
    /**
     * Gets contents of the photo controller file.
     */
    protected static getPhotoControllerTsTemplate(): string;
    /**
     * Gets contents of the photo controller file.
     */
    protected static getPhotoControllerJsTemplate(): string;
    /**
     * Gets contents of the User graphql schema file.
     */
    protected static getUserModelSchemaTemplate(database: string): string;
    /**
     * Gets contents of the Photo graphql schema file.
     */
    protected static getPhotoModelSchemaTemplate(database: string): string;
    /**
     * Gets contents of the User controller file.
     */
    protected static getUserControllerSchemaTemplate(database: string): string;
    /**
     * Gets contents of the Photo controller file.
     */
    protected static getPhotoControllerSchemaTemplate(database: string): string;
    /**
     * Gets contents of the UsersArgs file.
     */
    protected static getUsersArgsTemplate(): string;
    /**
     * Gets contents of the UserSaveArgs file.
     */
    protected static getUserSaveArgsTemplate(database: string): string;
    /**
     * Gets contents of the PhotoSaveArgs file.
     */
    protected static getPhotoSaveArgsTemplate(database: string): string;
    /**
     * Gets contents of the main (index) application file.
     */
    protected static getAppIndexTsTemplate(): string;
    /**
     * Gets contents of the main (index) application file.
     */
    protected static getAppIndexJsTemplate(): string;
    /**
     * Gets contents of the new package.json file.
     */
    protected static getPackageJsonTemplate(projectName?: string): string;
    /**
     * Gets contents of the new docker-compose.yml file.
     */
    protected static getDockerComposeTemplate(database: string): string;
    /**
     * Gets contents of the new readme.md file.
     */
    protected static getReadmeTemplate(database: string): string;
    /**
     * Appends to a given package.json template everything needed.
     */
    protected static appendPackageJson(packageJsonContents: string, database: string, language: "typescript" | "javascript"): string;
}
