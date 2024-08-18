import { getFamilyTreeUseIdFetch, getIdFamilyTreeFetch } from "../../../utils/apiFetch";
import React, { useEffect, useState } from "react";
import { ReactFlowProvider } from "reactflow";
import { RawFamilyMember, buildFamilyAndRelations, RawFamilyRelation } from "./utils";
import { FamilyTree } from "./FamilyTree";
import "reactflow/dist/style.css";
import rawFamily from "./family1.json";

const DisplayFamilyTree = () => {
  const [listId, setListId] = useState([]);
  const [id, setId] = useState(null);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [familyRelations, setFamilyRelations] = useState([]);
  const [showTree, setShowTree] = useState(false);

  useEffect(() => {
    if (id !== null) {
      getFamilyTreeUseIdFetch(id).then((res) => {
        setFamilyMembers(res.data.familyMembers);
        setFamilyRelations(res.data.familyRelations);
        setShowTree(true); // Show the tree after fetching data
      });
    }
  }, [id]);

  useEffect(() => {
    getIdFamilyTreeFetch().then((res) => {
      setListId(res.data.listId);
    });
  }, []);

  // Function to render the tree
  const renderFamilyTree = () => {
    console.log(familyMembers)
    console.log(familyRelations)
    const [familyMembersRecord, familyRelationsRecord] = buildFamilyAndRelations(
      familyMembers,
      familyRelations
    );
    console.log(Object.values(familyMembersRecord))
    const rootMember = Object.values(familyMembersRecord)[0];
    return (
      <ReactFlowProvider>
        <div style={{ height: "100vh", width: "100vw" }}>
          <FamilyTree
            familyMembers={familyMembersRecord}
            familyRelations={familyRelationsRecord}
            rootMember={rootMember}
          />
        </div>
      </ReactFlowProvider>
    );
  };

  return (
    <div>
      <div className="container mx-auto">
        <h1 className="text-center text-[1.3rem] sm:text-[1.5rem] font-bold py-[1rem]">شجرة العائلة</h1>
        <select
          onChange={(event) => {
            setId(event.target.value);
            setShowTree(false); // Hide the tree when changing ID
          }}
          className="select select-bordered w-full max-w-xs"
        >
          <option disabled selected>
            اختر اسم شجرة العائلة
          </option>
          {listId.map((value) => (
            <option key={value._id} value={value._id}>
              {value.name}
            </option>
          ))}
        </select>
      </div>
      {showTree && renderFamilyTree()}
    </div>
  );
};

export default DisplayFamilyTree;
