import React, { createRef, useCallback, useEffect, useRef, useState } from 'react'
import { useContext } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { GenericResponse } from '../../app.definition';
import { LoggedInRmdNavBar } from '../../components/LoggedInRmdNavBar/LoggedInRmdNavBar';
import env from '../../config/config';
import './Create.scss';
import { Map } from './Map';

export interface destination { name?: string, description?: string, lat?: number, lng?: number, order?: number, file?: File};

export default () => {

    const { useState } = React;
    const navigate = useNavigate();

    const [profile, setProfile] = useState<{ [key: string]: any }>({});
    const [basicCreateDetails, setBasicCreateDetails] = useState({ title: '', description: '' });
    const [destinations, setDestinations] = useState<destination[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentDestination, setCurrentDestination] = useState<destination>({});

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) navigate('/');

        fetch(`${env.api}/api/v1/secured/profile`, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }).then((res) => {
            return res.json()
        }).then((res: GenericResponse) => {
            if (res.result === 'FAILED') navigate('/explore', { state: { loggedIn: false } });
            setProfile(res.data);
        })

    }, []);

    const handleFormChange = (e: any) => {
        const { name, value } = e.target;
        setBasicCreateDetails({ ...basicCreateDetails, [name]: value });
    }

    const onConfirmAdd = (e: destination) => {
        let isUpdate = false;
        const destinationsUpdated = destinations.map(el =>{
            if (el.lat == e.lat && el.lng == el.lng) {
                el = {...el, ...e};
                isUpdate = true;
            }
        
            return el;
        }); 

        if (isUpdate) {
            setDestinations([...destinationsUpdated]);
        } else {
            setDestinations([...destinationsUpdated, e]);
        }

    }

    const destinationClick = (e: destination) => {
        setCurrentDestination(e);
        setIsEditing(true);
    }

    const hideModal = () => {
        setIsEditing(false);
    }

    const applyOrder = () => {
        destinations.map((e, index) => {
            e.order = index;
        })

        setDestinations(destinations);
    }

    const formSubmit = (e: any) => {

        applyOrder();

        const detour = {
            destinations: destinations,
            basicCreateDetails: basicCreateDetails,
        }

        fetch(`${env.api}/api/v1/secured/create`, {
            method: 'post',
            body: JSON.stringify({detour: detour}),
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-type': 'application/json'
            }
        }).then((res) => {
            console.log(res);
        })
    }

    return (
        <div>
            <LoggedInRmdNavBar></LoggedInRmdNavBar>
            <div className='container pt-5'>
                <div className="row">
                    <div className="col-12 col-sm-6 flex-shrink-0">
                        <Form>
                            Hi , {profile.name}
                            <Form.Group className="mb-3" controlId="formBasicTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control name="title" type="text" placeholder="What's the route called?" defaultValue={basicCreateDetails.title}
                                    onChange={handleFormChange} />
                                <Form.Text className="text-muted">
                                    Low budget secret country side route?? how?
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" name="description" placeholder="Describe this route" defaultValue={basicCreateDetails.description}
                                    onChange={handleFormChange} />
                            </Form.Group>
                            <Button type='button' onClick={formSubmit}> Submit </Button>
                        </Form>
                    </div>
                    <div className="destination-cards-section col-12 col-sm-6">
                        <DestinationCards onDestinationClick={destinationClick} destinations={destinations}></DestinationCards>
                    </div>
                </div>
            </div>

            <div className="mt-2">
                <AddDestinations onConfirmAdd={onConfirmAdd} destinations={destinations}></AddDestinations>
            </div>

            { isEditing && 
            <AddDestinationModal currentDestination={currentDestination} onAdd={onConfirmAdd} onHide={hideModal} show={isEditing}></AddDestinationModal> }


        </div>

    )
}

const AddDestinations = ({ onConfirmAdd, destinations, ...props }: { onConfirmAdd: any, destinations: destination[], }) => {

    const { useState } = React;
    const [addingDestination, setAddingDestination] = useState(false);
    const [currentDestination, setCurrentDestination] = useState<destination>({});
    const [destinationSet, setDestinationSet] = useState<destination[]>(destinations);


    useEffect(() => {
        setDestinationSet(destinations);
    }, [destinations])

    const handleMapClick = (lat: number, lng: number) => {
        if (lat && lng) {
            setAddingDestination(true);
            setCurrentDestination({ lat: lat, lng: lng })
        }
    }

    const hideModal = () => {
        setAddingDestination(false);
    }

    const onAdd = (addedDestination: destination) => {
        console.log('From Map: adding ', addedDestination);
        onConfirmAdd(addedDestination);
    }

    return (
        <div className="container">
            <div className='map-wrapper'>
                <Map mapClick={handleMapClick} destinations={destinationSet}
                    ></Map>

                <AddDestinationModal show={addingDestination} onAdd={onAdd} onHide={hideModal} currentDestination={currentDestination} />
            </div>
        </div>



    );
}


const AddDestinationModal = ({ show, currentDestination, onAdd, onHide, ...rest }: { show: any, onAdd: any, currentDestination: destination, onHide: any }) => {

    const { useState, useEffect } = React;

    const [destination, setDestination] = useState<destination>({ ...currentDestination });
    const [filePath, setFilePath] = useState<string>();
    const fileUploadRef = useRef<HTMLInputElement>(null);

    const handleForImagePreview = (file: File) => {
        const reader = new FileReader();

        reader.onload = () => {
          setFilePath(reader.result as string)
        }
        reader.readAsDataURL(file)
    }

    useEffect(() => {
        setDestination({ ...currentDestination });

        if (destination.file) {
            handleForImagePreview(destination.file);
        }

    }, [currentDestination])

    const handleFormChange = (e: any) => {
        const { name, value } = e.target;
        setDestination({ ...destination, [name]: value });
    }

    const add = () => {
        onAdd(destination);
        setDestination({});
        setFilePath('');
        onHide();
    }

    const clickHide = () => {
        setDestination({});
        setFilePath('');
        onHide();
    }

    const imagePreviewClick = (_: any) => {
        fileUploadRef.current?.click();
    }

    const fileUploadChange = (e: any) => {
        const file: File = e.target.files[0];

        if (file) {
            destination.file = file;
            handleForImagePreview(file);
        }
    }

    return (
        <Modal
            {...rest}
            show={show}
            size="lg"
            backdrop={'static'}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton onClick={clickHide}>
                <Modal.Title id="contained-modal-title-vcenter">


                    Adding {destination.name} @ {destination.lat} {destination.lng}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex">
                    <div className="p-2">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicTitle">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name" type="text" placeholder="What's the route called?" defaultValue={destination.name}
                                onChange={handleFormChange} />
                            <Form.Text className="text-muted">
                                Low budget secret country side route?? how?
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" name="description" placeholder="Describe this route" defaultValue={destination.description}
                                onChange={handleFormChange} />
                        </Form.Group>
                    </Form>
                    </div>
                    <div className="p-2 w-100 h-100">
                        <div onClick={imagePreviewClick} className="image-preview" style={{backgroundImage: 
                            filePath ? 'url(' + filePath + ')' : 'unset',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center center',
                            backgroundRepeat: 'no-repeat'
                            
                            }}>

                        </div>
                    </div>
                    <input type="file" hidden={true} id="fileInput" onChange={fileUploadChange} ref={fileUploadRef}/>
                </div>
                

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={clickHide}>Close</Button>
                <Button onClick={add}>Add</Button>
            </Modal.Footer>
        </Modal>
    )
}

const elipPipe = (text: string | undefined, maxChar: number): string => {
    const textCut = text?.slice(0, maxChar);
    return textCut + '...';
}

const DestinationCards = ({onDestinationClick, destinations, ...props}: {onDestinationClick: any, destinations: destination[]}) => {


    const destinationClick = (e: destination) => {
        console.log(e);
        onDestinationClick(e);
    }

    

    return (
        <div className="h-100 w-100 destination-card-wrapper">
            {
                destinations.map((e, index) => {

                    return (
                        <DestinationCard key={index} destination={e} destinationClick={destinationClick}/>
                    )
                })
            }
        </div>
    )


}


const DestinationCard = ({destination, destinationClick, ...props}: {destination: destination, destinationClick: any}) => {

    const [filePath, setFilePath] = useState('');

                    if (destination.file) {
                        const reader = new FileReader();

                        reader.onload = () => {
                            setFilePath(reader.result as string)
                        }

                        reader.readAsDataURL(destination.file);
                    }

                    const handleClick = () => {
                        destinationClick(destination);
                    }

                    return (
                        <div onClick={handleClick} className="destination-card mx-2">
                            <div className="title p-2">
                                {destination.name}
                            </div>
                            <div className="description p-2 mb-2">
                                {elipPipe(destination.description, 35)}

                                
                            </div>
                            <div className="p-2 image-preview" style={{
                                    backgroundImage: filePath ? `url(${filePath})` : 'unset',
                                    backgroundSize: '100% 100%',
                                    backgroundPosition: 'center center',
                                    backgroundRepeat: 'no-repeat'
                                }}>

                                </div>
                        </div>
                    )
}



