import React, { memo, useEffect, useState } from 'react';
import { ServiceApi } from '../services/Api';
import { useSearchParams } from 'react-router-dom';

function ProductSidebar() {
    const [categories, setCategories] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const categorySelected = searchParams.get('categoryId');

    function handleFilterProductByCategory(value) {
        setSearchParams(prevParams => {
            if (!value) {
                prevParams.delete('categoryId');
            } else {
                prevParams.set('categoryId', value);
            }
            return prevParams;
        });
    }

    const getCategories = async () => {
        try {
            const res = await ServiceApi.getCategories();
            if (res.ok) {
                setCategories(res.data);
            } else {
                console.error('Lỗi khi lấy danh mục sản phẩm:', res.problem);
            }
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div className="sticky top-0 flex flex-col flex-1 space-y-6">
            <div>
                <p className="text-xs">Trang chủ / Cửa hàng</p>
            </div>
            <div>
                <p className="mb-4 font-semibold">Danh mục</p>
                <ul className="space-y-4 text-sm">
                    <li
                        onClick={() => handleFilterProductByCategory('')}
                        className={`cursor-pointer ${!categorySelected ? 'font-semibold' : ''}`}
                    >
                        Tất cả sản phẩm
                    </li>
                    {categories.map((item) => (
                        <li
                            key={item.id}
                            onClick={() => handleFilterProductByCategory(item.id)}
                            className={`cursor-pointer ${categorySelected === item.id ? 'font-semibold' : ''}`}
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default memo(ProductSidebar);
