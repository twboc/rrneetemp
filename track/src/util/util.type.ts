
export interface Connection {
    downlink?: number | undefined;
    downlinkMax?: any;
    effectiveType?: string | undefined;
    rtt?: number | undefined;
    type?: string | undefined;
}

export interface UserAgentConfig {
    /**
     *  The value of navigator.appName
     */
    appName: string;
    /**
     *  The value of navigator.connection
     */
    connection?: Connection | undefined;
    /**
     *  The value of navigator.cpuClass
     */
    cpuClass?: string | undefined;
    /**
     * One of desktop, mobile, or tablet depending on the type of device
     */
    deviceCategory?: string | undefined;
    /**
     *  The value of navigator.oscpu
     */
    oscpu?: string | undefined;
    /**
     * The value of navigator.platform
     */
    platform: string;
    /**
     * The value of navigator.plugins.length
     */
    pluginsLength: number;
    /**
     *  The value of screen.height
     */
    screenHeight: number;
    /**
     * The value of screen.width
     */
    screenWidth: number;
    /**
     * The value of navigator.vendor
     */
    vendor: string;
    /**
     * The value of navigator.userAgent
     */
    userAgent: string;
    /**
     * The value of window.innerHeight
     */
    viewportHeight: number;
    /**
     * The value of window.innerWidth
     */
    viewportWidth: number;
}
