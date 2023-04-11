import React, { useEffect, useState } from 'react';
import { Grid, Container, Text, Col, Card, Row, Badge, Button, Input, Avatar, Image, Divider } from '@nextui-org/react';
import AudioVisualizer from './AudioVisualizer';
import Http from '../services/Services';

let data = [];
let theme; 
let playing = false;
let audio = new Audio();
let firstSong;
let audiovalue = 0;
let setGlobalAudioValue;
let duration = '00:00';
let lengthAudio = '00:00';
let globalSetLengthAudio;
let time;

const setCurrentTimeAudio = (bool=true) => {
    console.log(bool);
    if(bool != true)
    {
        clearInterval(time);
        audiovalue = 0;
        setGlobalAudioValue(audiovalue);
    }
    else
    {
        time = setInterval(() => {
            audiovalue = audiovalue + 1;
            setGlobalAudioValue(audiovalue);
        }, 1000);
    }
}

const changeIconPlay = () => {
    let btn = document.querySelector('#play');
    let icon = btn.querySelector('i');

    if(playing)
    {
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
    }
    else
    {
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    }
} 

const setPlay = (setTheme=null) => {

    if(playing)
    {
        pause();
    }
    else
    {
        play(setTheme);
    }

    changeIconPlay(playing);
}

const play = (setTheme=null) => {
    if(theme == undefined)
    {
        theme = firstSong;
        setTheme(theme);
        let url = './audio/' + theme;
        audio.src = url;
        audio.onloadedmetadata = () => {
            claculateLengthAudio(audio.duration);
            setCurrentTimeAudio();
        }
    }

    audio.play();
    playing = true;
    changeIconPlay();
}

const stop = () => {
    let url = './audio/' + (theme != undefined ? theme : firstSong);
    audio.src = url;

    audio.onloadedmetadata = () => {
        audio.pause();
        audio.currenTime = 0.0;
        playing = false;
        changeIconPlay();
        setCurrentTimeAudio(false);
    }
    
}

const pause = () => {
    audio.pause();
    playing = false;
}

const PlayerComponent = (_theme,setTheme,_lengthAudio) => {

    const [_audioValue,setAudioValue] = useState(audiovalue);

    useEffect(() => {
        setGlobalAudioValue = setAudioValue;
    },[]);

    return(
        <Col css={{
            padding: '0.5em 4em'
        }}>
            <Col justify='space-between' align='center'>
                <Image 
                    width={150}
                    height={150}
                    src={'./images/music.webp'}
                />
                { /*AudioVisualizer(audio)*/ }
            </Col>
            <Row justify='center' align='center' css={{ height: '5em' }}>
                <Text b align='center' size={'13px'}>{theme != undefined ? _theme : 'Nada seleccionado'}</Text>
            </Row>
            <Row justify='space-between' align='center'>
                <Text size={'12px'}>{ duration }</Text>
                <input 
                type={'range'} 
                style={{ width: '100%', margin: '0 1em' }} 
                min={0} 
                max={100} 
                value={_audioValue} 
                onChange={() => { }}
                />
                <Text size={'12px'}>{_lengthAudio}</Text>
            </Row>
            <br />
            <Row justify='space-between' align='center' css={{
                flexWrap: 'wrap',
                padding: '0 2.5em'
            }}>
                <Button auto rounded bordered color={'gradient'}>
                    <i className='fa fa-step-backward'></i>
                </Button>
                <Button id='play' auto rounded color={'gradient'} onPress={(evt) => setPlay(setTheme)}>
                    <i className='fa fa-play'></i>
                </Button>
                <Button auto rounded color={'gradient'} onPress={() => stop()}>
                    <i className='fa fa-stop'></i>
                </Button>
                <Button auto rounded bordered color={'gradient'}>
                    <i className='fa fa-step-forward'></i>
                </Button>
            </Row>
        </Col>
    );
}

const getMusic = (setData) => {
    fetch( Http.host + '/get-audio').then(rs => rs.json()).then(rs => {
        setData(rs);

        firstSong = rs[0];
    });
}

const setMusic = (song,setTheme) => {
    theme = song;
    playing = true;

    setTheme(theme);

    audio.src = './audio/' + song;
    audio.onloadedmetadata = () => {
        audio.play();
        changeIconPlay();
        setCurrentTimeAudio();
        claculateLengthAudio(audio.duration);
    };
} 

const claculateLengthAudio = (lenghtAudio) => {
    let min = Math.floor(lenghtAudio / 60);
    let sec = 60 / min;
    lengthAudio = (min < 10 ? '0' + min : min)+':'+sec;
    globalSetLengthAudio(lengthAudio);
}

const PlayList = (setTheme=null) => {
    const [_data,setData] = useState(data);

    useEffect(() => {

        getMusic(setData);

    },[data]);

    return (
        <div id={'list-container'} style={{
            overflowY: 'scroll',
            maxHeight: 'calc(2 * 12em)',
            padding: '1em'
        }}>
            { _data.map((el,i) => <Card key={'card-' + i} variant='bordered' isHoverable css={{
                width: '100%', marginBottom: '1em'
            }}>
            <Card.Body css={{ padding: '0.5em 2em', cursor: 'pointer' }} onClick={() => setMusic(el,setTheme)}>
                <Row align='center'>
                    <Avatar
                    zoomed
                    size={'xl'} 
                    src='./images/music.webp' 
                    />
                    <div style={{width: '10%'}}></div>
                    <Col>
                        <Text b size={'11px'}>{ el }</Text>
                        <br />
                        <Text color='success' b size={'10px'}>Disponible</Text>
                    </Col>
                    <Divider css={{
                        transform: 'rotate(90deg)',
                        width: '20%'
                    }} />
                    <Badge size={'lg'}>
                        <i className="fa fa-play" style={{ margin: 0 }}></i>
                    </Badge>
                </Row>
            </Card.Body>
        </Card>) } 
        </div>
    );
}

const Home = () => {

    const [_theme,setTheme] = useState(theme);
    const [_lengthAudio,setLengthAudio] = useState(lengthAudio);

    useEffect(() => {
        globalSetLengthAudio = setLengthAudio;
    },[audio]);

    return (
        <Grid.Container gap={8}>
            <Grid xs={6} css={{
                borderRight: 'solid 1px #c1c1c1'
            }}>
                { PlayerComponent(_theme,setTheme,_lengthAudio) }
            </Grid>
            <Grid xs={6}>
                <Col>
                    { PlayList(setTheme) }
                </Col>
            </Grid>
    </Grid.Container>
    )
}

export default Home