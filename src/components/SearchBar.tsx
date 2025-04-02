'use client';
import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <form className="d-flex justify-content-center mt-4">
      <input 
        className="form-control w-50"
        type="search"
        placeholder="Search events..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="btn btn-primary ms-2">Search</button>
    </form>
  );
}


//mitalisisodia24
//RPz3moyOFbtlCGMD
//mongodb+srv://mitalisisodia24:RPz3moyOFbtlCGMD@cluster0.yxvqs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0