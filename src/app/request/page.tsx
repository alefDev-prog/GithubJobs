"use client";

import { useState } from "react";

export default function Request() {
    const [test, setTest ] = useState<any>(null);

    return (
        <><p>{test}</p>
        <button onClick={() => setTest(2)}>test</button>
        </>
        
    )
}