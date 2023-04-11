import { Text, Navbar, Button, Avatar, Row } from '@nextui-org/react';

const TopMenu = () => {
    return (
        <div className="top-menu">
            <div>
                <i className="fa fa-whatsapp"></i> +1 (829)-647-8546
                &nbsp;
                &nbsp;
                &nbsp;
                <i className="fa fa-envelope"></i> rafael.flores.martinez@gmail.com
            </div>
            <div>
                <i className='fa fa-info-circle'></i> Otras apps que te gustarian ver!
            </div>
        </div>
    )
}

const MainMenu = () => {
    return (
        <Navbar isBordered variant={'static'}>
            <Navbar.Brand>
                <Text h2 color="inherit" hideIn="xs">
                    <Row align='center'>
                        <Avatar src='./images/music.webp' size={'sm'} /> Música
                    </Row>
                </Text>
            </Navbar.Brand>
            <Navbar.Content hideIn="xs"></Navbar.Content>
            <Navbar.Content>
                <Navbar.Item color="inherit" href="#">
                    <Button auto bordered color={'primary'}><i className='fa fa-heart'></i></Button>
                </Navbar.Item>
            </Navbar.Content>
        </Navbar>
    )
}

export {
    TopMenu,
    MainMenu
}