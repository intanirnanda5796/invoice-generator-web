class General {
  static randomNumber = () => {
    const chars = '0123456789';
    const stringLength = 4;
    let randomstring = '';
    for (let i = 0; i < stringLength; i += 1) {
      const rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars[rnum];
    }
    return randomstring;
  };

  static pad = (pad, str, padLeft) => {
    if (typeof str === 'undefined') return pad;
    if (padLeft) {
      return (pad + str).slice(-pad.length);
    }
    return (str + pad).substring(0, pad.length);
  };
}

export default General;
