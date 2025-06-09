import React from 'react'

export default function CatImages(props) {
  return (
    <div>CatImages

1:
{props.imageOfCat && <img
                src={props.imageOfCat}
                alt="new cat image" />
            }



    </div>
  )
}
