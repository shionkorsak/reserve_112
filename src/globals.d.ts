/* eslint-disable no-var */

declare global {
    var mongooseCache: {
      conn: mongoose.Connection | null;
      promise: Promise<mongoose.Connection> | null;
    } | undefined;
  }
  
  export {};
  