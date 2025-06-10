export class LocalStorage {
  public static setItem = (key: string, value: string) => {
    return localStorage.setItem(key, value);
  };
  public static getItem = (key: string) => {
    return localStorage.getItem(key);
  };
  public static removeItem = (key: string) => {
    return localStorage.removeItem(key);
  };
  public static clear = () => {
    return localStorage.clear();
  };
}
