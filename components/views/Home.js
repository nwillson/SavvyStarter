import html from "html-literal";

export default state => html`





  </section>


<div class = "collection"><h1>An Entire Collection of Pup-STL's Dog Friendly Location List</h1></div>

<div class = "tableList"><table style= "margin-left: auto; margin-right: auto;" >

</table>

</div>

<div class="dynamicTable">
    <table>
      <thead>
        <tr>
          <th>Location Name:</th>
          <th>Type of Establishment:</th>
          <th>Safety Rating:</th>
        </tr>
      </thead>
      <tbody id="data-output">
        <!-- Prodcuts from javascript file in here. -->
      </tbody>
    </table>



  </div>
</div>

  <div class="crime"><h1>Crime</h1></div>
  <div class="crimeMap">
<a href ="https://www.neighborhoodscout.com/mo/st-louis/crime"><h2>A Visual St. Louis City Crime Map</h2></a>

<iframe src = "https://federalcos.com/blog/st-louis-mo-crime-rate/" width= 800px; height= 800px;></iframe>
`;
