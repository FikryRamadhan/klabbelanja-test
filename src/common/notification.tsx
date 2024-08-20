import { notification } from "antd";
import { BellOutlined } from '@ant-design/icons';

const openNotification = (message: string, description: string) => {
    notification.open({
        message: message,
        description: description,
        icon: (
            <BellOutlined 
                style={{
                    color: '#108ee9',
                }}
            />
        ),
    });
};

export default openNotification