import React, { useState, useEffect} from 'react';

function CatImageLoader() {
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 300) {
            console.log()
            setPage(prevPage => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        fetch(`https://api.thecatapi.com/v1/images/search?limit=5&page=${page}`)
            .then(response => response.json())
            .then(data => {
                setImages(prevImages => [...prevImages, ...data]);
            });
    }, [page]);

    return (
        <div className="loader">
            <h1>Hello from my project</h1>
            <div>
                {images && images.map((image, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <img src={image.url} alt="cat" style={{ marginBottom: '10px' }} />
                        <p>{image.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CatImageLoader;