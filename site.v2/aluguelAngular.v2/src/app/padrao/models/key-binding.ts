export class KeyBinding {

  constructor(
    keyCode: number,
    callback: (event: any) => void,
    config?: object) {
    const fullConfig = this._applyDefaultConfigs(config);

    this._keyCode = keyCode;
    this._callback = callback;
    this._ctrlKey = fullConfig.ctrlKey;
    this._altKey = fullConfig.altKey;
  }

  private _keyCode = null;

  get keyCode() {
    return this._keyCode;
  }

  private _callback = null;

  get callback() {
    return this._callback;
  }

  set callback(callback) {
    if (typeof (callback) === 'function') {
      this._callback = callback;
    }
  }

  private _ctrlKey = null;

  get ctrlKey() {
    return this._ctrlKey;
  }

  private _altKey = null;

  get altKey() {
    return this._altKey;
  }

  matchKeyBinding(kb: KeyBinding) {
    if (kb.keyCode === this._keyCode && kb.ctrlKey === this._ctrlKey && kb.altKey === this._altKey) {
      return true;
    }

    return false;
  }

  matchEvent(event) {
    const eventKeyCode = event.keyCode || event.witch;

    return this.matchKeyBinding(new KeyBinding(eventKeyCode, () => {
    }, {ctrlKey: event.ctrlKey, altKey: event.altKey}));
  }

  private _applyDefaultConfigs(config?: object) {
    const defaultConfig = {
      ctrlKey: false,
      altKey: false
    };

    if (!config) {
      config = {};
    }

    return Object.assign({}, defaultConfig, config);
  }

}
