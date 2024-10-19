/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React from 'react';

export default function ThethreeCards() {
    let TheCardObj = [
        {
            TheImageURL: './image/El3enb.png',
            TheTitle: "Vitamin C serum Known for its exceptionally high Vitamin C content, this fruit is often used in natural Vitamin C extracts.",
            TheLi: []
        },
        {
            TheImageURL: './image/ChinesPhoto.jpg',
            TheTitle: "Sakura Set Cherry blossom extract is renowned for its skin benefits, including:",
            TheLi: ["Hydration", "Anti-Aging", "Brightening", "Soothing"]
        },
        {
            TheImageURL: './image/EL Ard 2ly fy sa7ra 3ayznha tob2a 5adra.jpg',
            TheTitle: "Centella Asiatica is a medicinal plant Benefits in Skincare:",
            TheLi: ["Wound Healing", "Anti-Inflammatory", "Hydration", "Anti-Aging", "Antioxidant", "Skin Soothing"]
        },
    ];

    const mappingEle = TheCardObj.map((ele, index) => {
        return (
            <div key={index} className=''>
                <img className='w-12/12 rounded-md' src={ele.TheImageURL} alt="" />
                <div className="Txt text-center">
                    <h3>{ele.TheTitle}</h3>
                    <ol className='list-disc list-inside mt-2 text-left'>
                        {ele.TheLi.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    });

    return (
        <div className="ThethreeCards mx-5 mt-10 flex gap-20">
            {mappingEle}
        </div>
    );
}
