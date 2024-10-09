import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./WcAllDetails.css";
import logo from "../../Images/aradhanabookslogo.png";

function WcAllDetails() {
  const [requests, setRequests] = useState([]);
  const [confirmedRequests, setConfirmedRequests] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [actionFilter, setActionFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:2001/wcustomer/getAll")
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the customer requests!",
          error
        );
      });

    const storedConfirmedRequests =
      JSON.parse(localStorage.getItem("confirmedRequests")) || {};
    setConfirmedRequests(storedConfirmedRequests);
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:2001/wcustomer/delete/${id}`)
      .then((response) => {
        alert("Customer request deleted successfully");
        setRequests(requests.filter((request) => request._id !== id));

        setConfirmedRequests((prev) => {
          const newConfirmed = { ...prev };
          delete newConfirmed[id];
          localStorage.setItem(
            "confirmedRequests",
            JSON.stringify(newConfirmed)
          );
          return newConfirmed;
        });
      })
      .catch((error) => {
        console.error(
          "There was an error deleting the customer request!",
          error
        );
      });
  };

  const handleConfirm = (id) => {
    const isConfirmed = confirmedRequests[id];

    if (!isConfirmed) {
      axios
        .post(`http://localhost:2001/wcustomer/confirmRequest/${id}`)
        .then((response) => {
          const updatedConfirmedRequests = {
            ...confirmedRequests,
            [id]: true,
          };
          setConfirmedRequests(updatedConfirmedRequests);
          localStorage.setItem(
            "confirmedRequests",
            JSON.stringify(updatedConfirmedRequests)
          );
          alert("Customer request confirmed and email sent!");
        })
        .catch((error) => {
          console.error(
            "There was an error confirming the customer request!",
            error
          );
        });
    } else {
      alert("This request has already been confirmed and cannot be changed.");
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
      putOnlyUsedFonts: true,
      floatPrecision: 16,
    });

    doc.addImage(logo, "PNG", 10, 10, 40, 20);

    const headerText = "Aradhana Books & Stationary®";
    const headerFontSize = 20;
    doc.setFont("Jura", "bold");
    doc.setFontSize(headerFontSize);
    const headerTextWidth = doc.getTextWidth(headerText);
    const xHeaderCenter =
      (doc.internal.pageSize.getWidth() - headerTextWidth) / 2;
    doc.text(headerText, xHeaderCenter, 15);

    const subHeaderText = "Experience the Difference in Every Aisle";
    const subHeaderFontSize = 10;
    doc.setFontSize(subHeaderFontSize);
    const subHeaderTextWidth = doc.getTextWidth(subHeaderText);
    const xSubHeaderCenter =
      (doc.internal.pageSize.getWidth() - subHeaderTextWidth) / 2;
    doc.text(subHeaderText, xSubHeaderCenter, 20);

    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    doc.setFontSize(10);
    doc.text(`Date: ${formattedDate}`, 10, 35); // Add date to the document

    doc.line(10, 25, doc.internal.pageSize.getWidth() - 10, 25);
    doc.setFontSize(14);
    doc.text("Wholesale Customer Requests Report", 14, 40);

    const columnWidths = [30, 60, 30, 30, 30, 40, 30];

    const bodyData = filteredRequests.map((request) => [
      request.customername,
      request.customeremail,
      request.customerphone,
      request.companyName,
      request.customeraddress,
      request.description,
      confirmedRequests[request._id] ? "Confirmed" : "To Confirm",
    ]);

    doc.autoTable({
      head: [
        [
          "Name",
          "Email",
          "Phone",
          "Company Name",
          "Address",
          "Description",
          "Actions",
        ],
      ],
      body: bodyData,
      startY: 45,
      theme: "striped",
      styles: {
        cellPadding: 2,
        fontSize: 10,
      },
      columnStyles: {
        0: { cellWidth: columnWidths[0] }, // Name
        1: { cellWidth: columnWidths[1] }, // Email
        2: { cellWidth: columnWidths[2] }, // Phone
        3: { cellWidth: columnWidths[3], halign: "left" }, // Company Name
        4: { cellWidth: columnWidths[4], halign: "left" }, // Address
        5: {
          cellWidth: columnWidths[5],
          halign: "left",
          overflow: "linebreak",
        },
        6: { cellWidth: columnWidths[6], halign: "left" },
      },

      didDrawPage: function (data) {
        doc.setFontSize(10);
        doc.text("Page " + data.pageCount, 180, 285);
      },
    });

    doc.save(`customer_requests_report_${formattedDate}.pdf`);
  };

  // Update the filteredRequests logic to include actionFilter
  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.customername.toLowerCase().includes(searchQuery.toLowerCase());

    const actionStatus = confirmedRequests[request._id]
      ? "Confirmed"
      : "Confirm";
    const matchesAction = actionFilter ? actionStatus === actionFilter : true;

    return matchesSearch && matchesAction;
  });

  return (
    <div className="piyumal_wcAllDetails">
      <div className="piyumal__actions">
        <button onClick={generatePDF} className="piyumal__button-generate-pdf">
          Generate PDF
        </button>
        <input
          type="text"
          placeholder="Search by Company or Customer Name"
          className="piyumal__search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value)}
          className="piyumal__dropdown"
        >
          <option value="">All</option>
          <option value="Confirm">To Confirm</option>
          <option value="Confirmed">Confirmed</option>
        </select>
      </div>

      <table id="table-to-pdf" className="piyumal__table_wcdetails">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company Name</th>
            <th>Address</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map((request) => (
            <tr key={request._id}>
              <td>{request.customername}</td>
              <td>{request.customeremail}</td>
              <td>{request.customerphone}</td>
              <td>{request.companyName}</td>
              <td>{request.customeraddress}</td>
              <td>{request.description}</td>
              <td>
                <button
                  className={
                    confirmedRequests[request._id]
                      ? "piyumal__button-confirmed"
                      : "piyumal__button-confirm"
                  }
                  onClick={() => handleConfirm(request._id)}
                  disabled={confirmedRequests[request._id]}
                >
                  {confirmedRequests[request._id] ? "Confirmed" : "Confirm"}
                </button>
                <br />
                <br />
                <button
                  onClick={() => handleDelete(request._id)}
                  className="piyumal__button-delete"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WcAllDetails;
