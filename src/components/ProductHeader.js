import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Dropdown, Input } from 'antd';
const { Search } = Input;

const SortOptions = {
    'id-asc': 'Sắp xếp theo độ phổ biến',
    'price-asc': 'Sắp xếp theo giá: từ thấp đến cao',
    'price-desc': 'Sắp xếp theo giá: từ cao đến thấp',
};

export default function ProductHeader() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchValue, setSearchValue] = useState(searchParams.get('q') || '');
    const sortDefault = searchParams.get('sort') || 'id-asc';
    const [sort, setSort] = useState(SortOptions[sortDefault] || 'Sắp xếp theo độ phổ biến');

    function handleOrderProduct(value) {
        const sortValue = SortOptions[value];
        setSort(sortValue);
        setSearchParams(prevParams => {
            if (value) {
                prevParams.set('sort', value);
            } else {
                prevParams.delete('sort');
            }
            return prevParams;
        });
    }

    function handleSearchProduct() {
        setSearchParams(prevParams => {
            if (searchValue) {
                prevParams.set('q', searchValue);
            } else {
                prevParams.delete('q');
            }
            return prevParams;
        });
    }

    const items = [
        {
            key: 'id-asc',
            label: (
                <button onClick={() => handleOrderProduct('id-asc')}>
                    Sản phẩm phổ biến
                </button>
            ),
        },
        {
            key: 'price-asc',
            label: (
                <button onClick={() => handleOrderProduct('price-asc')}>
                    Sản phẩm: Từ thấp đến cao
                </button>
            ),
        },
        {
            key: 'price-desc',
            label: (
                <button onClick={() => handleOrderProduct('price-desc')}>
                    Sản phẩm: Từ cao đến thấp
                </button>
            ),
        },
    ];

    return (
        <div className="flex flex-row items-center justify-between w-full">
            <div>
                <Search
                    size="large"
                    className="w-[300px] text-sm"
                    placeholder="Tìm kiếm với từ khóa"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onSearch={handleSearchProduct}
                    allowClear
                />
            </div>
            <Dropdown menu={{ items }} placement="bottomLeft">
                <Button size="large">{sort}</Button>
            </Dropdown>
        </div>
    );
}
