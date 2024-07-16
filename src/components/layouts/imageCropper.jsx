import React from 'react'

const ASPECT_RATIO = 1
const MIN_DIMESNION = 150

function imageCropper() {

    const [imgSrc, setImgSrc] = useState('')
    
    const onSelectFile = (e) => {
      const file = e.target.files?.[0]
      if(!file) return

      const reader = new FileReader()
      reader.addEventListener("load", ()=>{
        const ImgUrl = reader.results?.toString() || ""
        console.log(ImgUrl)
        setImgSrc(ImgUrl)
      })
      reader.readAsDataURL(file)
    }


    return (
      <div>
        {imgSrc && (
          <div>
            <ReactCrop
              crop={crop}
              circularCrop
              keepSelection
              aspect = {ASPECT_RATIO}
              minWidth={MIN_DIMESNION}>

              <img src={imgSrc} alt="uplaoded picture" />
            </ReactCrop>
          </div>
          )
        }
      </div>
    )
}

export default imageCropper