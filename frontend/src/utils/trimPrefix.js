const trimPrefix  = (item)=>{
    const newItem = {};
    for (const key in item) {
        if (item.hasOwnProperty(key)) {
          const newKey = key.replace(/^(s|f|h|sp|fp|hp)_/, ''); // 使用正则表达式去掉 s_
          newItem[newKey] = item[key];
        }
      }
    return newItem;   
}

export default trimPrefix;