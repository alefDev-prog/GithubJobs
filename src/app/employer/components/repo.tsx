"use client";

export default function Repo({repository}:{repository:any}) {
    console.log(repository);
    return (
        <div className="list-group-item list-group-item-action">{repository.name}</div>
    )
}