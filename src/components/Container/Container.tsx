import { FC, ReactChild, ReactNode } from 'react';
import cl from './Container.module.scss';
interface IContainerProps {
    title: string,
    children: ReactChild | ReactNode
}

const Container: FC<IContainerProps>  = ({
    title,
    children
}) => {
    return (
        <div className={cl.container}>
            <h1>{title[0].toUpperCase() + title.slice(1)}</h1>
            {children}
        </div>
    );
}

export default Container;
