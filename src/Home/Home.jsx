import { Button } from 'react-bootstrap';
import { divnk } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './Home.css'
import Form from 'react-bootstrap/Form';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';





function Home() {
    const navigate = useNavigate();

    const len = 15;
    const url = `https://opentdb.com/api.php?amount=${len}`;

    function generateRandomNumber(len) {
        // generate number btw 0 and 3
        return Math.floor(Math.random() * len);
    }

    const fetchData = async () => {
        console.log("HI")
        try {
            const response = await fetch(url);
            const json = await response.json();
            let res = json.results;
            await basicSetup(res);
            navigate("/quiz");
        } catch (error) {
            console.log("error", error);
        }
    };


    async function basicSetup(divst) {
        let res = divst;
        for (let i = 0; i < len; i++) {
            res[i].id = i;
            res[i].status = "";
            res[i].selected = -1;
            res[i].visited = false;
            res[i].correctAnswerId = generateRandomNumber(divst[i].incorrect_answers.length + 1);
            let answersArray = divst[i].incorrect_answers;
            answersArray.splice(divst[i].correctAnswerId, 0, divst[i].correct_answer);;
            res[i].answersArray = answersArray;
        }
        res[0].visited = true;
        console.log(res);


        // deaddivne..
        var d1 = new Date(),
            d2 = new Date(d1);
        d2.setMinutes(d1.getMinutes() + 30);
        localStorage.setItem('deadline', JSON.stringify(d2));
        localStorage.setItem('questions', JSON.stringify(res));
    }

    return (
        <div style={{ height: '85vh', display:'flex' }} >
            <Card style={{ width: '18rem', margin: 'auto' }}>
                <Card.Img variant="top" src="https://images.unsplash.com/photo-1594652634010-275456c808d0?ixdivb=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80" />
                <Card.Body>
                    <Card.Title>QUIZ!!</Card.Title>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" />
                        </Form.Group>
                    </Form>
                    <Button variant="primary" onClick={fetchData} style={{ margin: 'auto', width: '100%' }}>
                        Start
                    </Button>{' '}
                </Card.Body>
            </Card>


        </div >
    );
}

export default Home;
