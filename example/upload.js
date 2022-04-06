const requestAPost = ({
  url,
  method = "POST",
  data,
  headers = {},
  requestList
}) => {
  return new Promise(resolve => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      Object.keys(headers).forEach(key => {
          xhr.setRequestHeader(key, headers[key])
      })
      xhr.send(data);
      xhr.onload = e => {
          resolve({
              data: e.target.reponse
          })
      }
  })
}


const SIZE = 1024 * 1024; // 切片大小
const uploadBtn = document.querySelector('#upload-btn');
const fileInput = document.querySelector('#fileInputfield');

let data = {
  container: {
      file: null
  }
}

const createFileChunk = (file, size = SIZE ) => {
  const fileChunkList = [];
  let cur = 0;
  while (cur < file.size) {
      fileChunkList.push({
          file: file.slice(cur, cur + size)
      })
      cur += size
  }
  return fileChunkList
}

const mergeRequest = async () => {
  await requestAPost({
      url: "http://localhost:3000/merge",
      headers: {
           "content-type": "application/json"
      },
      data: JSON.stringify({
          filename: data.container.file.name
      })
  })
}



const uploadChanges = e => {
  const [file] = e.target.files
  console.log('file', file)
  if (!file) {
      return
  }
  // Object.assign(data, )
  data.container.file = file

}

const uploadBigfile = async e => {
  const fileChunkList = createFileChunk(data.container.file);
  console.log('fileChunkList', fileChunkList)
  const updaloadData = fileChunkList.map(({file}, index) => ({
      chunk: file,
      hash: `${data.container.file.name}-${index}`
  }))
  console.log('updaloadData', updaloadData)
  //上传切片文件
  const requestList = updaloadData.map(({chunk, hash}) => {
      const formData = new FormData();
      formData.append('chunk', chunk)
      formData.append('hash', hash)
      formData.append('filename', data.container.file.name)
      return {formData}
  })
  .map(async({formData}) => {
      requestAPost({
          url: 'http://localhost:3000',
          data: formData
      })
  })
  await Promise.all(requestList)
  await mergeRequest()
}



fileInput.addEventListener('change', uploadChanges)
uploadBtn.addEventListener('click', uploadBigfile)