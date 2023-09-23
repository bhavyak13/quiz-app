import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './Summary.css'


function Summary() {

    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const questions = JSON.parse(localStorage.getItem('questions'));
        if (questions) {
            setQuestions(questions);
            let tempscore = 0;
            questions.forEach(e => {
                if (e.selected === e.correctAnswerId) tempscore++;
            });
            setScore(tempscore)
        }
    }, []);


    if (!questions.length) {
        return <div>please wait we are getting your results..</div>
    }
    return (
        <div className='root_summary'>

            <div className="score">
                Final Score : {score}
            </div>

            <div className="obj">
                {questions.map((e, indx) => (
                    <div className='' key={indx}>
                        <Card style={{ width: '28rem', margin: 'auto', marginBottom: '1rem' }}>
                            <Card.Body>
                                <Card.Title>Question {indx + 1} : {e.question}</Card.Title>
                                <Card.Text style={{ display: 'flex', justifyContent: 'space-between' }} >
                                    <div className="text_status">
                                        Status : {e.selected < 0 ? "Unattempted" : (e.correctAnswerId === e.selected) ? "Corect Answer" : "Wrong Answer"}
                                    </div>
                                    <div className="text_score">
                                        Score : {e.correctAnswerId === e.selected ? 1 : 0}/1
                                    </div>
                                </Card.Text>
                                <ListGroup as="ul">
                                    {e.answersArray.map((q, ind) => (
                                        <ListGroup.Item key={`222${ind}`} as="li" variant={e.correctAnswerId === ind ? "success" : ((e.selected === ind) ? "danger" : "")}>
                                            {q}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                        {/* Selected : {e.answersArray[e.selected]} */}
                        {/* Correct Answer : {e.correct_answer} */}
                    </div>
                ))}
            </div>
        </div>

    );
}

export default Summary;
