import { produce } from "immer";
import React, { useState } from "react";
import { generate } from "shortid";

export const ListActors = (props) => {
    const [people, setPeople] = useState([
        { id: "1", firstName: "", lastName: "" }
    ]);

    return (
        <div>
            {people.map((p, index) => {
                return (
                    <div key={p.id}>
                        <input
                            onChange={e => {
                                const firstName = e.target.value;
                                setPeople(currentPeople =>
                                    produce(currentPeople, v => {
                                        v[index].firstName = firstName;
                                    })
                                );
                            }}
                            value={p.firstName}
                            placeholder="first name"
                        />
                        <input
                            onChange={e => {
                                const lastName = e.target.value;
                                setPeople(currentPeople =>
                                    produce(currentPeople, v => {
                                        v[index].lastName = lastName;
                                    })
                                );
                            }}
                            value={p.lastName}
                            placeholder="last name"
                        />
                        <button
                            onClick={() => {
                                setPeople(currentPeople =>
                                    currentPeople.filter(x => x.id !== p.id)
                                );
                            }}
                        >
                            x
                        </button>
                    </div>

                );

            })}
            <button className="btn blue"
                    onClick={() => {
                        setPeople(currentPeople => [
                            ...currentPeople,
                            {
                                id: generate(),
                                firstName: "",
                                lastName: ""
                            }
                        ]);
                        props.onChange(people)
                    }}
            >
                Add new Actor
            </button>
        </div>
    );
};
