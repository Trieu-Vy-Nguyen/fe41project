import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { App } from 'antd';
import Banner1 from './Banner1';

import Footer from './Footer';
import Feedback from './Feedback';




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
			<Outlet />
			<Feedback />
			<Footer />
		</div>
	);
}


export { message, modal, notification };