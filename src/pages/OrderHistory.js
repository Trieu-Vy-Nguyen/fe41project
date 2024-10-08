import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Image, Table, message } from 'antd';
import { ServiceApi } from '../services/Api';
import { useSearchParams } from 'react-router-dom';
import Price from '../components/Price';
import { insertObjectIf } from '../utils';
import moment from 'moment';
import { setShowAuthModal } from '../store/redux/AuthSlice';
import AuthSidebar from '../components/AuthSidebar';
import { modal } from '../components/Layout';

export default function OrderHistory() {
    const user = useSelector((state) => state.auth.user);
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const [orders, setOrders] = useState([]);
    const [fetching, setFetching] = useState(false);

    const getOrders = async () => {
        setFetching(true);
        const res = await ServiceApi.getOrders({
            _embed: 'orderDetails',
            ...insertObjectIf(user, { userId: user.id }),
        });
        if (res.ok) {
            setOrders(res.data);
        }
        setFetching(false);
    };

    useEffect(() => {
        if (user) {
            getOrders();
        } else {
            dispatch(setShowAuthModal(true));
        }
    }, [searchParams, user]);

    const onDelete = async (id) => {
        modal.confirm({
            title: 'Xóa phần giao dịch này',
            description: 'Bạn chắc chắn muốn xóa nó chứ?',
            onOk: async () => {
                await ServiceApi.deleteOrders(id);
                await getOrders();
                message.success('Xóa thành công !!');
            },
            okText: 'Có',
            cancelText: 'Không',
        });
    };

    const columns = [
        Table.EXPAND_COLUMN,
        {
            title: 'Thông tin khách hàng',
            render: (text, record) => (
                <div className="flex flex-col">
                    <p className="text-xs">{record.fullName}</p>
                    <p className="text-xs">
                        {[record.phone, record.email, record.address, record.city, record.country].join(', ')}
                    </p>
                </div>
            ),
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (value) => <Price value={value} />,
        },
        {
            title: 'Phương thức thanh toán',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
            render: (method) => (
                <span>
                    {method === 'cod' ? 'Thanh toán khi nhận hàng' : 'Thanh toán qua QR Code'}
                </span>
            ),
        },
        {
            title: 'Ngày Đặt Hàng',
            dataIndex: 'orderDate',
            key: 'orderDate',
            render: (value) => moment(value).format('YYYY.MM.DD hh:mm'),
        },
        {
            title: 'Công cụ',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: (_, record) => (
                <Button danger size="small" onClick={() => onDelete(record.id)}>
                    Xóa
                </Button>
            ),
        },
    ];

    return (
        <div className="container py-10 mx-auto min-h-[calc(100vh_-_139px)]">
            <div className="grid grid-cols-5 gap-6">
                <AuthSidebar />
                <div className="grid col-span-4 p-6 bg-white shadow-md">
                    <Table
                        columns={columns}
                        loading={fetching}
                        expandable={{
                            expandedRowRender: (record) => (
                                <div>
                                    <table className="table-auto w-full">
                                        <thead>
                                            <tr className="[&_th]:py-2">
                                                <th></th>
                                                <th className="text-left">Sản Phẩm</th>
                                                <th className="text-center">Giá</th>
                                                <th className="text-center">Size</th>
                                                <th className="text-center">Số lượng</th>
                                                <th className="text-right">Tổng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {record.orderDetails.map((item) => (
                                                <tr key={item.id} className="[&_td]:pt-2">
                                                    <td>
                                                        <Image src={item.product.image} width={60} height={60} />
                                                    </td>
                                                    <td className="text-left">{item.product.name}</td>
                                                    <td className="text-sm text-center">
                                                        <Price value={item.price} />
                                                    </td>
                                                    <td className="text-center">{item.product.size}</td>
                                                    <td>
                                                        <p className="text-center w-full">{item.quantity}</p>
                                                    </td>
                                                    <td className="text-sm text-right">
                                                        <Price value={item.quantity * item.price} />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ),
                        }}
                        dataSource={orders}
                    />
                </div>
            </div>
        </div>
    );
}
