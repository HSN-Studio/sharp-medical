<!DOCTYPE html>

<html lang="en">



<head>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php
    $page_title = get_the_title();
    $site_title = get_bloginfo('name');
    echo '<title>' . $page_title . ' - ' . $site_title . '</title>';
    ?>

    <script src="https://cdn.tailwindcss.com"></script>


    <!-- baseURL = https://sharpmedicalstaffing.com/wp-content/themes/sharp  -->



    <link rel="stylesheet" href="https://sharpmedicalstaffing.com/wp-content/themes/sharp/sharp-medical/styles.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap')
    </style>

</head>



<body>

    <!-- Call Built In WordPress Header  -->

    <?php

    get_header();

    ?>



    <!-- Call Built In WordPress Content Area  -->

    <?php the_content(); ?>

    <div class="wrap container lg:max-w-[1440px] mx-auto px-[10px] my-[150px]">



        <main class="main w-full flex flex-col lg:flex-row">

            <?php

            /*

            Template Name: Sharp Medical Single Job

            */



            // Get the URL parameters and set them to null if they are not provided
            
            // Initialize an empty array to store the values of the parameters
            
            $parameters = array(

                'discipline' => null,

                'specialty' => null,

                'city' => null,

                'state' => null,

                'id' => null,
            );

            // Loop through each parameter
            
            foreach ($parameters as $param_name => $param_value) {

                // Check if the parameter is set in the URL
            
                if (isset($_GET[$param_name])) {

                    // If the parameter is set, get its value(s)
            
                    $param_values = $_GET[$param_name];



                    // If there is only one value, convert it to an array
            
                    if (!is_array($param_values) && $param_name != 'lastmodified' && $param_name != 'id') {

                        $param_values = array($param_values);

                    }



                    // Update the value in the $parameters array
            
                    $parameters[$param_name] = $param_values;

                }

            }



            // Prepare the request body
            
            $requestBody = json_encode([

                "LastModifiedDate" => null,

                "Skip" => 0,

                "Take" => null,

                "Discipline" => $parameters['discipline'],

                "Specialty" => $parameters['specialty'],

                "City" => $parameters['city'],

                "State" => $parameters['state'],

            ]);



            // Prepare cURL options
            
            $ch = curl_init("https://sharpjobs.azurewebsites.net/api/jobs");

            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

            curl_setopt($ch, CURLOPT_POST, true);

            curl_setopt($ch, CURLOPT_POSTFIELDS, $requestBody);

            curl_setopt($ch, CURLOPT_HTTPHEADER, [

                'Content-Type: application/json',

                'Content-Length: ' . strlen($requestBody)

            ]);



            // Execute the request
            
            $response = curl_exec($ch);



            // Check for errors
            
            if ($response === false) {

                echo "Error: " . curl_error($ch);

            } else {
                $data = json_decode($response, true);

                // // Output the response
                // Create the statement
                function createStatement($specialty, $discipline, $city, $state)
                {
                    $statement = "Travel";

                    if ($specialty) {
                        $statement .= " " . $specialty;
                    }

                    if ($discipline) {
                        $statement .= " " . $discipline;
                    }
                    if ($city) {
                        $statement .= " In " . $city;
                    }
                    if ($state) {
                        $statement .= ", " . $state;
                    }

                    return $statement;
                }




                $showMessageBox = '';
                if ($data && isset($data['jobs']) && is_array($data['jobs']) && count($data['jobs']) > 0) {
                    foreach ($data['jobs'] as $job) {
                        if ($job['id'] == $parameters['id']) {

                            // Fetch the discipline options from the API
                            $disciplineOptions = json_decode(file_get_contents('https://sharpjobs.azurewebsites.net/api/discipline'), true);
                            // Fetch the specialty options from the API
                            $specialtyOptions = json_decode(file_get_contents('https://sharpjobs.azurewebsites.net/api/specialty'), true);
                            //Hide Message Box if Job Found
                            $showMessageBox = ' hidden ';
                            // Create Title
                            $title = createStatement($job['specialty'], $job['discipline'], $job['city'], $job['state']);
                            echo '<div class="your-next-adventure lg:w-2/4 px-[15px]">';
                            echo '<div class="title-container">';
                            echo '<h4 class="your-next-adventure h4">Your next adventure</h4>';
                            echo '</div>';
                            // Display the statement in an H2 tag
                            echo "<h1 class=\"job-title font-semibold\">$title</h1>";
                            echo '</div>';

                            echo '<div class="job-details lg:w-2/4">';
                            echo '<div class="quick-apply-container-parent w-full lg:flex relative">';
                            echo '<div>';
                            echo '<div class="quick-apply-current-item px-[15px]"';
                            foreach ($job as $key => $value) {
                                echo 'data-' . $key . '="' . htmlspecialchars($value) . '"';
                            }
                            echo '></div>';
                            echo '<div class="quick-apply-current-item-view px-[15px]">';
                            echo '<div class="flex flex-wrap gap-4 lg:gap-10">';
                            echo '<div class="quick-apply-job-title">' . '<strong>Job Title: </strong>' . $job['title'] . '</div>';
                            echo '<div class="quick-apply-job-specialty">' . '<strong>Specialty: </strong>' . $job['specialty'] . '</div>';
                            echo '<div class="quick-apply-job-discipline">' . '<strong>Discipline: </strong>' . $job['discipline'] . '</div>';
                            echo '</div>';
                            echo '<div class="flex flex-wrap gap-4 mt-4 lg:gap-10">';
                            echo '<div class="quick-apply-job-location">' . '<strong>Location: </strong>' . $job['city'] . ', ' . $job['state'] . '</div>';
                            echo '<div class="quick-apply-job-shift">' . '<strong>Shift: </strong>' . $job['shift'] . '</div>';
                            echo '<div class="quick-apply-job-weekly-hours">' . '<strong>Weekly Hours: </strong>' . $job['weeklyHours'] . '</div>';
                            echo '</div>';
                            echo '<div class="flex flex-wrap gap-4 mt-4 lg:gap-10">';
                            echo '<div class="quick-apply-job-start-date">' . '<strong>Start Date: </strong>' . $job['start'] . '</div>';
                            echo '<div class="quick-apply-job-last-modified">' . '<strong>Last Updated: </strong>' . (new DateTime($job['lastModifiedDate']))->format('m/d/Y h:i A') . '</div>';
                            echo '<div class="quick-apply-job-id"><strong>Job ID: </strong>' . $job['id'] . '</div>';
                            echo '</div>';
                            echo '<div class="mt-4 quick-apply-job-weekly-rate gradient-text h5"><strong>$' . number_format($job['weeklyRate'], 2) . '</strong>' . ' wk' . '</div>';
                            echo '<hr class="hr-job-detail-page w-full">';
                            echo '<div class="quick-apply-job-description my-2">' . '<strong>Description: </strong>' . $job['description'] . '</div>';
                            echo '</div>';
                            echo '<div class="quick-apply-form mt-10 px-[15px]">';
                            echo '<hr class="hr-job-detail-page w-full">';
                            echo '<div class="quick-apply-title">' . '<strong>Quick Apply </strong>' . '</div>';

                            // First name and Last Name
                            echo '<div class="flex flex-wrap quick-apply-form-name-fields mt-4">';
                            echo '<div class="col-16 col-lg-6 mb-2">';
                            echo '<input class="quick-apply-form-text-field w-full quick-apply-form-first-name" type="text" id="first_name" name="first_name" placeholder="First name *"></input>';
                            echo '</div>';
                            echo '<div class="col-16 col-lg-6 mb-2">';
                            echo '<input class="quick-apply-form-text-field w-full quick-apply-form-last-name" type="text" id="last_name" name="last_name" placeholder="Last Name *"></input>';
                            echo '</div>';
                            echo '</div>';

                            // Email and Phone 
                            echo '<div class="flex flex-wrap quick-apply-form-contact-fields">';
                            echo '<div class="col-16 col-lg-6 mb-2">';
                            echo '<input class="quick-apply-form-text-field w-full quick-apply-form-email" type="text" id="email" name="email" placeholder="Email address *"></input>';
                            echo '</div>';
                            echo '<div class="col-16 col-lg-6 mb-2">';
                            echo '<input class="quick-apply-form-text-field w-full quick-apply-form-phone" type="text" id="phone" name="phone" placeholder="Phone *"></input>';
                            echo '</div>';
                            echo '</div>';

                            // Discipline and Specialty 
                            echo '<div class="flex flex-wrap quick-apply-form-discipline-specialty-fields">';
                            echo '<div class="col-16 col-lg-6 mb-2">';
                            echo '<select class="quick-apply-form-select-field w-full quick-apply-form-job-title" name="job_title" id="job_title" ><option value="">Job title *</option>';
                            foreach ($disciplineOptions as $option) {
                                echo "<option value=\"{$option['name']}\">{$option['name']}</option>";

                            }
                            echo '</select>';
                            echo '</div>';
                            echo '<div class="col-16 col-lg-6 mb-2">';
                            echo '<select class="quick-apply-form-select-field w-full quick-apply-form-job-specialty" name="job_specialty" id="job_specialty" ><option value="">Select your specialty *</option>';

                            foreach ($specialtyOptions as $option) {



                                echo "<option value=\"{$option['name']}\">{$option['name']}</option>";

                            }
                            echo '</select>';
                            echo '</div>';
                            echo '</div>';


                            // Resume Upload
                            echo '<div class="flex flex-wrap quick-apply-form-resume-fields mb-2">';
                            echo '<div class="col-16 relative px-[15px] w-full">';
                            echo '<input class="quick-apply-form-text-field w-100 quick-apply-resume-field quick-apply-resume-change-action" name="resume" id="resume" type="file" accept="pdf, doc, docx">';
                            echo '<label class="hidden custom-file-label cursor-pointer quick-apply-resume-field-label mr-lg-2">Resume (optional)</label>';
                            echo '</div>';
                            echo '</div>';

                            echo '<div class="flex mt-4 px-[15px]">
                        <span class="quick-apply-form-terms">
                        By clicking here, you acknowledge Sharp Medical Staffing will collect and use the personal information you provide in accordance with its Privacy Policy, End User License Agreement, Acceptable Use Policy and Term of Use and that you have read and agree to be bound by these policies. You also agree to receive emails, automated text messages and phone calls from or on behalf of Sharp Medical Staffing about employment opportunities, positions in which you have been placed, and your employment with Sharp Medical Staffing.
                        <br>
                        <br>
* Estimated pay and benefits package based on bill rate at time job was posted. Bill rates can change frequently and without notice. Exact pay and benefits package may vary based on several factors, including, but not limited to, guaranteed hours, travel distance, demand, experience, eligibility, etc.
</span>
                        </div>';
                            echo '<div class="quick-apply-submit flex flex-wrap items-center gap-4 mt-4 px-[15px]">
                        <div class="quick-apply-button-container flex">
                        <button class="btn-gradient btn-lg rounded-pill hover-highlight w-100 quick-apply-submit-button relative">
                        <span class="quick-apply-submit-text">Apply for this position</span>
                        <span class=""></span>
                        </button>
                        </div>';
                            echo '</div>';
                            echo '</div>';
                            echo '</div>';

                        }


                    }




                }

                echo '</div>';
                echo '<div class="border border-[#b3b3b3] border-solid rounded-xl message-box my-10 text-center p-2 bg-[#f4f5f6] justify-center items-center' . $showMessageBox . 'gap-2" role="alert">
                <span class="message">
                The job in question has been closed. See similar jobs <a href="https://sharpmedicalstaffing.com/find-travel-medical-jobs/">here</a>.
                </span>                

                </div>
                </div>';
            }


            // Close cURL session
            
            curl_close($ch);

            ?>



    </div>

    </main>



    <!-- Call Built In WordPress Footer  -->

    <?php get_footer(); ?>

</body>



</html>