export class EnvironmentHelper {
  public static isLocal() {
    return !process.env.NODE_ENV || process.env.NODE_ENV === 'local';
  }
}
