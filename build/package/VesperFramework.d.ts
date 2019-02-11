/// <reference types="express" />
/// <reference types="node" />
import { VesperFrameworkOptions } from "./options/VesperFrameworkOptions";
import { Application } from "express";
import { Server } from "http";
/**
 * Bootstraps Vesper framework.
 * Registers controllers and middlewares, creates http server and database connection.
 */
export declare class VesperFramework {
    /**
     * Application's root path.
     */
    root: string;
    /**
     * Framework options.
     */
    options: VesperFrameworkOptions;
    /**
     * Express application instance.
     */
    application: Application;
    /**
     * Running http server instance.
     */
    server: Server;
    constructor(options: VesperFrameworkOptions);
    /**
     * Starts express application and http server.
     * If port is not given then port from the framework options will be used.
     */
    start(): Promise<void>;
    /**
     * Stops express application and http server.
     */
    stop(): Promise<void>;
    /**
     * Builds configuration parameters to be injected into the container.
     */
    protected buildParameters(): any | undefined;
}
