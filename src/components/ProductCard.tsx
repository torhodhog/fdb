import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { motion, useTransform } from 'framer-motion';

interface Product {
    title: string;
    link: string;
    thumbnail: string;
}

interface ProductCardProps {
    product: Product;
    translate: any; // La oss midlertidig la dette være av typen 'any'
}

const ProductCard = ({ product, translate }: ProductCardProps) => {
    // Konverterer MotionValue til number
    const translateX = useTransform(translate, value => value as number);

    return (
        <motion.div
            style={{ x: translateX }}
            whileHover={{ y: -20 }}
            className="group product h-96 w-[30rem] relative flex-shrink-0"
        >
            <Link href={product.link} passHref>
                <a className="block group-hover:product:shadow-2xl">
                    <Image
                        src={product.thumbnail}
                        height="600"
                        width="600"
                        layout="fill"
                        className="object-cover absolute"
                        alt={product.title}
                    />
                </a>
            </Link>
            <div className="absolute inset-0 h-full w-full opacity-0 group-hover:product:opacity-80 bg-black pointer-events-none"></div>
            <h2 className="absolute bottom-4 left-4 opacity-0 group-hover:product:opacity-100 text-white">
                {product.title}
            </h2>
        </motion.div>
    );
};

export default ProductCard;
