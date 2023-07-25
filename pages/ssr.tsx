import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "./index.module.css";

type Props = {
    initialImageUrl: string;
};

const IndexPage: NextPage<Props> = ({initialImageUrl}) => {
    const [imageUrl, setImageUrl] = useState(initialImageUrl);
    const [loading, setLoading]   = useState(true);

    // useEffect(()=>{
    //     fetchImage().then((newImage)=>{
    //         setImageUrl(newImage.url);
    //         setLoading(false);
    //     });
    // }, []);

    const handleClick = async () => {
        setLoading(true);
        const newImage = await fetchImage();
        setImageUrl(newImage.url);
        setLoading(false);
    };

    return (
        <div className={styles.page}>
            <button onClick={handleClick} className={styles.button}>Seee other cat.</button>
            <div className={styles.frame}>
                <div>{loading || <img src={imageUrl} className={styles.img}/>}</div>
            </div>
            {/* <div>{loading || <img src={image.url} width={image.width} height={image.height}/>}</div> */}
        </div>
    );
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps<Props> = async()=>{
    const image = await fetchImage();
    return {
        props: {
            initialImageUrl: image.url,
        },
    };
};

type Image = {
    url: string;
    // width: number;
    // height: number;
};

const fetchImage = async():Promise<Image> => {
    const res = await fetch("https://api.thecatapi.com/v1/images/search");
    const images = await res.json();
    console.log(images);
    return images[0];
};


