using AP.Contracts;
using AP.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AP.WebUI.Controllers
{
    public class ExternalController : Controller
    {
        

        //
        // GET: /External/

        public ActionResult Index()
        {
            return View();
        }

        //
        // GET: /External/Details/5

        public ActionResult Details(int id)
        {
            return View();
        }

        //
        // GET: /External/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /External/Create

        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /External/Edit/5

        public ActionResult Edit(int id)
        {
            return View();
        }

        //
        // POST: /External/Edit/5

        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /External/Delete/5

        public ActionResult Delete(int id)
        {
            return View();
        }

        //
        // POST: /External/Delete/5

        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
