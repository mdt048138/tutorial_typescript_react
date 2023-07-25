import { NextPage } from "next";
import { useEffect, useState } from "react";

const IndexPage: NextPage = () => {
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading]   = useState(true);
    const [width, setWidth]   = useState(640);
    const [height, setHeight] = useState(480);
    const [image, setImage]   = useState({url:"", width:640, height:480});

    useEffect(()=>{
        fetchImage().then((newImage)=>{
            setImageUrl(newImage.url);
            setLoading(false);
            let [w,h] = resize(newImage.width, newImage.height);
            setWidth(w);
            setHeight(h);
            setImage({url:newImage.url, width:w, height:h});
        });
    }, []);

    const handleClick = async () => {
        setLoading(true);
        const newImage = await fetchImage();
        setImageUrl(newImage.url);
        setLoading(false);
        let [w,h] = resize(newImage.width, newImage.height);
        setWidth(w);
        setHeight(h);
        setImage({url:newImage.url, width:w, height:h});
    };

    return (
        <div>
            <button onClick={handleClick}>Seee other cat.</button>
            {/* <div>{loading || <img src={imageUrl} width={width} height={height}/>}</div> */}
            <div>{loading || <img src={image.url} width={image.width} height={image.height}/>}</div>
        </div>
    );
};

export default IndexPage;

function resize(width:number, height:number){
    let aspect = width/height;
    if(aspect > 640/480){
        return [640, Math.round(height*640/width)];
    } else {
        return [Math.round(width*480/height), 480];
    }
}

type Image = {
    url: string;
    width: number;
    height: number;
};

const fetchImage = async():Promise<Image> => {
    const res = await fetch("https://api.thecatapi.com/v1/images/search");
    const images = await res.json();
    console.log(images);
    return images[0];
};


