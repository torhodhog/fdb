"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const client_1 = require("@/trpc/client");
const navigation_1 = require("next/navigation");
const react_1 = require("react");
const PaymentStatus = ({ orderEmail, orderId, isPaid, }) => {
    const router = (0, navigation_1.useRouter)();
    const { data } = client_1.trpc.payment.pollOrderStatus.useQuery({ orderId }, {
        enabled: isPaid === false,
        refetchInterval: (data) => data?.isPaid ? false : 1000,
    });
    (0, react_1.useEffect)(() => {
        if (data?.isPaid)
            router.refresh();
    }, [data?.isPaid, router]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: 'mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600', children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: 'font-medium text-gray-900', children: "Shipping To" }), (0, jsx_runtime_1.jsx)("p", { children: orderEmail })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: 'font-medium text-gray-900', children: "Order Status" }), (0, jsx_runtime_1.jsx)("p", { children: isPaid
                            ? 'Payment successful'
                            : 'Pending payment' })] })] }));
};
exports.default = PaymentStatus;
