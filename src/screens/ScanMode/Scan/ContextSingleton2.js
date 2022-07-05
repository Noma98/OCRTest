import { isAndroid } from '@/utils/check';
import { DataCaptureContext } from 'scandit-react-native-datacapture-core';

export default class ContextSingleton {
  static instance = ContextSingleton.instance || new ContextSingleton();

  constructor() {}

  getDataCaptureContext() {
    if (!this.dataCaptureContext) {
      console.log('Context Null - creating');
      this.dataCaptureContext = DataCaptureContext.forLicenseKey(
        isAndroid()
          ? 'ATjQr4aBEspFHOV90TdF4pQidNFzDLM443UyjdVnpOMJcS3Iuky5RRhnbFuOaIM331LFEKcwYDn+csbWkleIPypjwgyUfTM70i09Xdt0fXdhZv2Gel2R0U5Ow9NKM2poNDpU160f7V4kOzTYyTmZfSP0f1NKgsYCV/h9uCetiU7QUfIAqULv9yfSf90CsF9h2tbm9lqbjH6xh06JKyczOFjv6mpc03BokRWHw8FJutOYMPiVvzDdp3CeiMT2/v86pDQ6zEr6NgmOsbN4ECcn/mV6GXZYT1dVSs9uK16k4qgQdFCauIQpysBrUuUAXkmJtnjlA171zlqFwYgFXYQ1HneAORt14LCEE+taLUMSU+LTMEafXOoGgwf73PktZyPoiFpGko3u7FG0gvO6CmsWfjYCWMArhfna26g/cHAAmC5E8AuOvgQymJIejCjypyLvFsJzUl+dzRpTOqTmcKANT2vVgQG/MVTNNytoe9pm7uM169skWG5At1XF7IqGuYMh44WiJyeXax0RZznvO6FbHg8B0wRp7hN4qDmv1nI7/ZY/gtlE2Lr5uCOf5uXnwtKhSSU4Xj0WOvCLiqCErqOfapbJtcAoYxGY/q2y3CliEfml/EkQmRE9FR0VVCFdSJrf4tT1P8laPkv7dh52wPBRqOX9S7YoQOCMZJVhueXqQCA/0p0QwjwdNoEmmX8U0gcyqXL6JStkyLuxy6tPiHCmC9Fv4OSqoGoKhPnvqveDdaMuWjMyr/vrchX8xZ/fbxKHb9lELUc/rxC3TlatsMifWmAP08tN5W4j9bXY1OqDu3hlEl6w0E/xy052Gg=='
          : 'ARqw4J6BCl9qC4ramhm+7wY8FsD5CNkTpnjX0DRtdTIne3MzokFhG6VfsTlDKh7PRyB4Evts0ozzeBadz1pmXL5P6TyCbJ+JxHW0Bugv0R0FDpszRkKDla1LIMs9J9Tnryu/D8Q4dF5TBJBA8RnheczIcIT5AIoDGM4wBz8sjO0FSiXSZQuV5N5Mfd62/Ty/lM2qAvbSkSWtjx/3H4em28bUHhoPWB3Mg7LeP6JpppM1+p8ByYLcnwbwbZejHrel0GRREQ1bVv8X1HidkInoX59LAejsbRnFGbL9hgXeAQ4sELiIDRkzydGdeRwYGqJS86woegyyKX9/dfy4NVcg0x/+OhX9H2CmiprCdobwkSLSCrIVRt5P3A1XF6OE4Hg0jCKqgY0kodEC/j0gHlqxDoceb/z0WxMMkC9B8W5B+DHf0HgfFrFmnoMgLP9EjFT9ygAXKZkfAazyWU9XTNiD7UoPQEjsF66yH9Id4NVKj89fQETcbtMO+/g/l1czGl1r+qcyNwdvZyNWPB3JiRonYr66sDHLcdRx2KBWa4mmXhk6/VPj1oIryOUFzeR70Qbp3k1oxFbBx9UUPVH2YLvuDjg5e5ysVOx+XE+umqZVwXiOaU7cTbIfZwlxVzZng3Be6XCZuT79b6R2/rpBttwAV4dl/L6oyjknahehQeGWl+NzPjDphcj7J9hjcCv0WaG7Y7A8swT7V/JEC0H+xZfKiemVYaihwTQNMRNrrMj4VAxG37BKMAu89SngPmP0p2gQvwHSUCsvEdJ8JDBK1pO4CKPMxEzDxg+9r0/YQoL08y7xiTSJE0fWlCsfUfQO0lhg',
      );
    } else {
      console.log('Getting Singleton Context');
    }
    return this.dataCaptureContext;
  }

  async resetDataCaptureContext() {
    if (this.dataCaptureContext) {
      this.dataCaptureContext.removeAllModes();
      await this.dataCaptureContext.dispose();
    }
    this.dataCaptureContext = null;
  }
}
