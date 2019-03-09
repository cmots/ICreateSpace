const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if(event.operation=='add'){
    return await db.collection(event.tableName).add(context.info); 
  }else if(event.operation=='delete'){
    return await db.collection(event.tableName).where({
      openid: event.info.openid,
    }).remove()
  }else if(event.operation=='update'){
    return await db.collection(event.tableName).where({
      openid: event.info.openid,
    }).update(event.info)
  }else if(event.operation=='query'){
    return db.collection(evnet.tableName).where({
      openid: event.info.openid,
    }).get()
  }else{
    return {sum: "wrong"}
  }
}