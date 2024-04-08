import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { App } from 'antd';
import Banner1 from './Banner1';
import Banner2 from './Banner2';
import Footer from './Footer';




let message;
let notification;
let modal;

export default function Layout() {

	const staticFunction = App.useApp();
	message = staticFunction.message;
	modal = staticFunction.modal;
	notification = staticFunction.notification;
	return (
		<div className="min-h-screen">
			<Header />
			<Banner1 />
			<Banner2 />
			<Outlet />
			<Footer />
		</div>
	);
}


export { message, modal, notification };