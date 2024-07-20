import { getFamilyTreeUseIdFetch, getIdFamilyTreeFetch } from "../../../utils/apiFetch";
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const DisplayFamilyTree = () => {
  const [listId, setListId] = useState(false);
  const [id, setId] = useState(false);
  const chartRef = useRef();

  useEffect(() => {
    if (id !== false) {
      getFamilyTreeUseIdFetch(id).then((res) => {
        parentFunction(res.data.familyTree.familyTree);
      });
    }
  }, [id]);

  useEffect(() => {
    getIdFamilyTreeFetch().then((res) => {
      setListId(res.data.listId);
    });
  }, []);

  const parentFunction = (jsondata) => {
    // Clear existing SVG element
    d3.select(chartRef.current).selectAll("*").remove();

    let mouseX = 0;
    let buttonTracker = [];
    let rootNode = d3.hierarchy(jsondata, (d) => d.children);
    let pathLinks = rootNode.links();
    let updatePathLinks;

    let circleLinks = rootNode.descendants();
    let updateCircleLinks;

    let textLinks = rootNode.descendants();
    let updateTextLinks;

    let dim = {
      width: 2000,
      height: window.innerHeight * 2,
      margin: 0,
    };

    let svg = d3
      .select(chartRef.current)
      .append("svg")
      .style("background", "white")
      .attr("width", dim.width)
      .attr("height", dim.height);

    document.querySelector("#chart").classList.add("center");

    let g = svg.append("g").attr("transform", "translate(140,50)");

    let layout = d3.tree().size([dim.height - 50, dim.width - 320]);

    layout(rootNode);
    console.log(rootNode.links());
    console.log("----------------------");
    console.log(rootNode.descendants());

    function update(data) {
      g.selectAll("path")
        .data(data, (d, i) => d.target.data.name)
        .join(
          (enter) =>
            enter
              .append("path")
              .attr(
                "d",
                d3
                  .linkHorizontal()
                  .x((d) => mouseX)
                  .y((d) => d.x)
              )
              .attr("fill", "none")
              .attr("stroke", "black"),
          (update) => update,
          (exit) =>
            exit.call((path) =>
              path
                .transition()
                .duration(300)
                .remove()
                .attr(
                  "d",
                  d3
                    .linkHorizontal()
                    .x((d) => mouseX)
                    .y((d) => d.x)
                )
            )
        )
        .call((path) =>
          path
            .transition()
            .duration(1000)
            .attr(
              "d",
              d3
                .linkHorizontal()
                .x((d) => d.y)
                .y((d) => d.x)
            )
            .attr("id", (d, i) => "path" + i)
        );
    }
    update(pathLinks);

    function updateCircles(data) {
      g.selectAll("circle")
        .data(data, (d) => d.data.name)
        .join(
          (enter) =>
            enter
              .append("circle")
              .attr("cx", (d) => mouseX)
              .attr("cy", (d) => d.x)
              .attr("r", 12)
              .attr("fill", (d) =>
                d.children == undefined ? "red" : "#2563eb"
              )
              .attr("id", (d, i) => d.data.name)
              .attr("class", "sel"),
          (update) => update,
          (exit) =>
            exit.call((path) =>
              path
                .transition()
                .duration(300)
                .remove()
                .attr("cx", (d) => mouseX)
                .attr("r", 0)
            )
        )
        .call((circle) =>
          circle
            .transition()
            .duration(1000)
            .attr("cx", (d) => d.y)
        )
        .on("mouseover", function (d) {
          d3.select(this)
            .attr("fill", "orange")
            .transition()
            .duration(100)
            .attr("r", 16);
        })
        .on("mouseout", function (d) {
          d3.select(this)
            .attr("fill", (d) => (d.children == undefined ? "red" : "#2563eb"))
            .transition()
            .duration(100)
            .attr("r", 12);
        })
        .on("click", async function (d) {
          let buttonId = d3.select(this).attr("id");
          mouseX = d3.select(this).attr("cx");

          let checkButtonExists = buttonTracker.filter(
            (button) => button.buttonId == buttonId
          );

          if (checkButtonExists[0] != undefined) {
            buttonTracker = buttonTracker.filter(
              (button) => button.buttonId != buttonId
            );

            pathLinks = checkButtonExists[0].buttonPathData.concat(pathLinks);
            update(pathLinks);

            circleLinks =
              checkButtonExists[0].buttonCircleData.concat(circleLinks);
            updateCircles(circleLinks);

            textLinks = checkButtonExists[0].buttonTextData.concat(textLinks);
            updateText(textLinks);

            return;
          }

          const clickedNode = d;
          const clickedNodeLinks = getNodeLinks(clickedNode);
          const valueArray = clickedNodeLinks.map(
            (link) => link.target.data.name
          );

          updatePathLinks = pathLinks.filter(
            (item) => !valueArray.includes(item.target.data.name)
          );
          const clickedPathData = pathLinks.filter((item) =>
            valueArray.includes(item.target.data.name)
          );

          updateCircleLinks = circleLinks.filter(
            (item) => !valueArray.includes(item.data.name)
          );
          const clickedCircleData = circleLinks.filter((item) =>
            valueArray.includes(item.data.name)
          );

          updateTextLinks = textLinks.filter(
            (item) => !valueArray.includes(item.data.name)
          );
          const clickedTextData = textLinks.filter((item) =>
            valueArray.includes(item.data.name)
          );

          buttonTracker.push({
            buttonId: buttonId,
            buttonPathData: clickedPathData,
            buttonCircleData: clickedCircleData,
            buttonTextData: clickedTextData,
          });

          update(updatePathLinks);
          updateCircles(updateCircleLinks);
          updateText(updateTextLinks);

          pathLinks = updatePathLinks;
          circleLinks = updateCircleLinks;
          textLinks = updateTextLinks;
        });
    }

    function getNodeLinks(node) {
      const links = [];
      function traverse(n) {
        if (n.children) {
          n.children.forEach((child) => {
            links.push({ source: n, target: child });
            traverse(child);
          });
        }
      }
      traverse(node);
      return links;
    }

    updateCircles(rootNode.descendants());

    function updateText(data) {
      g.selectAll("text")
        .data(data, (d) => d.data.name)
        .join(
          (enter) =>
            enter
              .append("text")
              .attr("x", (d) => mouseX)
              .attr("y", (d) => d.x + 30)
              .attr("font-size", 0)
              .text((d) => d.data.name),
          (update) => update,
          (exit) =>
            exit.call((text) =>
              text
                .transition()
                .duration(300)
                .remove()
                .attr("x", (d) => mouseX)
                .attr("font-size", 0)
            )
        )
        .call((text) =>
          text
            .transition()
            .duration(1000)
            .attr("x", (d) => d.y + 20)
            .attr("font-size", 20)
            .attr("font-bold", 700)
            .attr("fill", "black")
        );
    }

    updateText(textLinks);
  };

  return (
    <div>
      <div className="container mx-auto">
        <h1 className="text-center text-[1.3rem] sm:text-[1.5rem] font-bold py-[1rem]">شجرة العائلة</h1>
        <select
          onChange={(event) => {
            setId(event.target.value);
          }}
          className="select select-bordered w-full max-w-xs"
        >
          <option disabled selected>
            اختر اسم شجرة العائلة
          </option>
          {listId &&
            listId.map((value) => {
              return <option value={value._id}>{value.name}</option>;
            })}
        </select>
      </div>
      <div className="overflow-x-auto">
        <div className="w-[2000px]">
          <div id="chart" ref={chartRef}></div>
        </div>
      </div>
    </div>
  );
};

export default DisplayFamilyTree;
