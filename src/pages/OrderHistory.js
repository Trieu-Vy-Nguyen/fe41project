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
        try {
            const res = await ServiceApi.getOrders({
                _embed: 'orderDetails',
                ...insertObjectIf(user, { userId: user.id }),
            });
            if (res.ok) {
                setOrders(res.data);
            } else {
                message.error('Lấy danh sách đơn hàng không thành công');
            }
        } catch (error) {
            message.error('Lỗi khi lấy danh sách đơn hàng');
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
            title: "Xóa phần giao dịch này",
            description: "Bạn chắc chắn muốn xóa nó chứ?",
            onOk: async () => {
                try {
                    await ServiceApi.deleteOrders(id);
                    await getOrders();
                    message.success('Xóa đơn hàng thành công');
                } catch (error) {
                    message.error('Lỗi khi xóa đơn hàng');
                }
            },
            okText: "Có",
            cancelText: "Không",
        });
    };

    const columns = [
        { title: 'Code', dataIndex: 'id', key: 'id' },
        Table.EXPAND_COLUMN,
        {
            title: 'Lịch sử đặt hàng',
            render: (text, record) => (
                <div className="flex flex-col">
                    <p className="text-xs">{record.fullName}</p>
                    <p className="text-xs">
                        {[
                            record.phone,
                            record.email,
                            record.address,
                            record.city,
                            record.province, // Changed to province
                        ].join(', ')}
                    </p>
                </div>
            ),
        },
        {
            title: 'Số tiền',
            dataIndex: 'price',
            key: 'price',
            render: (value) => <Price value={value} />,
        },
        {
            title: 'Ngày đặt hàng',
            dataIndex: 'orderDate',
            key: 'orderDate',
            render: (value) => moment(value).format('YYYY.MM.DD HH:mm'),
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
                                                <th className="text-left">Sản phẩm</th>
                                                <th className="text-center">Tiền</th>
                                                <th className="text-center">Số lượng</th>
                                                <th className="text-right">Tổng</th>
                                                <th className="text-center">Size</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {record.orderDetails.map((item) => (
                                                <tr key={item.id} className="[&_td]:pt-2">
                                                    <td>
                                                        <Image
                                                            src={item.product.image}
                                                            width={60}
                                                            height={60}
                                                        />
                                                    </td>
                                                    <td className="text-left">{item.product.name}</td>
                                                    <td className="text-sm text-center">
                                                        <Price value={item.price} />
                                                    </td>
                                                    <td>
                                                        <p className="text-center w-full">{item.quantity}</p>
                                                    </td>
                                                    <td className="text-sm text-right">
                                                        <Price value={item.quantity * item.price} />
                                                    </td>
                                                    <td className="text-center">{item.product.size}</td> {/* Added Size Column */}
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
