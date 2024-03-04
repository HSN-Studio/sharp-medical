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

    <link rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/habibmhamadi/multi-select-tag@2.0.1/dist/css/multi-select-tag.css">

    <script src="https://cdn.jsdelivr.net/gh/habibmhamadi/multi-select-tag@2.0.1/dist/js/multi-select-tag.js"></script>

    <!-- baseURL = https://sharpmedicalstaffing.com/wp-content/themes/sharp  -->

    <link rel="stylesheet"
        href="https://sharpmedicalstaffing.com/wp-content/themes/sharp/sharp-medical/virtual-select/virtual-select.min.css" />

    <script
        src="https://sharpmedicalstaffing.com/wp-content/themes/sharp/sharp-medical/virtual-select/virtual-select.min.js"></script>

    <script type="module" src="https://sharpmedicalstaffing.com/wp-content/themes/sharp/sharp-medical/script.js"
        defer></script>

    <link rel="stylesheet" href="https://sharpmedicalstaffing.com/wp-content/themes/sharp/sharp-medical/styles.css">

</head>



<body>

    <!-- Call Built In WordPress Header  -->

    <?php

    get_header();

    ?>



    <!-- Call Built In WordPress Content Area  -->

    <?php the_content(); ?>

    <div class="wrap container lg:max-w-[1440px] mx-auto px-[10px] mt-[150px]">

        <div class="title-container my-8 sm:text-xl">

            <?php

            // Get the URL parameters and set them to null if they are not provided
            
            $discipline = isset($_GET['discipline']) ? explode(',', $_GET['discipline']) : null;

            $specialty = isset($_GET['specialty']) ? explode(',', $_GET['specialty']) : null;

            $city = isset($_GET['city']) ? explode(',', $_GET['city']) : null;

            $state = isset($_GET['state']) ? explode(',', $_GET['state']) : null;



            // Create the statement
            
            $statement = "Travel";

            if ($specialty && count($specialty) == 1) {

                $statement .= " " . $specialty[0];

            }

            if ($discipline && count($discipline) == 1) {

                $statement .= " " . $discipline[0];

            }

            $statement .= " Jobs";

            if ($city && count($city) == 1) {

                $statement .= " In " . $city[0];

            } else if ($state && count($state) == 1) {

                $statement .= " In " . $state[0];

            }



            // Display the statement in an H2 tag
            
            echo "<h2 class=\"page-title\">$statement</h2>";
            ?>







        </div>

        <div
            class="jobs-filters-container flex flex-wrap flex-col md:flex-row lg:justify-center xl:justify-between items-center gap-4 p-8 mb-[1.875rem]">

            <div class="jobs-filter jobs-filter-discipline">



                <label for="discipline">Discipline:</label>

                <select id="discipline" name="Discipline" class="jobs-filter-input" multiple>

                    <?php

                    // Fetch the discipline options from the API
                    
                    $disciplineOptions = json_decode(file_get_contents('https://sharpjobs.azurewebsites.net/api/discipline'), true);

                    // Get the URL parameters and set them to empty Array if they are not provided
                    
                    // Initialize an empty array to store the values of the parameters
                    
                    $parameters = array(

                        'discipline' => [],

                        'specialty' => [],

                        'city' => [],

                        'state' => []

                    );



                    // Loop through each parameter
                    
                    foreach ($parameters as $param_name => $param_value) {

                        // Check if the parameter is set in the URL
                    
                        if (isset($_GET[$param_name])) {

                            // If the parameter is set, get its value(s)
                    
                            $param_values = $_GET[$param_name];



                            // If there is only one value, convert it to an array
                    
                            if (!is_array($param_values)) {

                                $param_values = array($param_values);

                            }



                            // Update the value in the $parameters array
                    
                            $parameters[$param_name] = $param_values;

                        }

                    }



                    // Output the options
                    
                    foreach ($disciplineOptions as $option) {

                        $selected = in_array(strtolower($option['name']), explode(',', strtolower($parameters['discipline'][0]))) ? 'selected' : '';

                        echo "<option value=\"{$option['name']}\" $selected>{$option['name']}</option>";

                    }

                    ?>

                </select>

            </div>

            <div class="jobs-filter jobs-filter-specialty">

                <div id="specialty-select">



                    <label for="specialty">Specialty:</label>

                    <select id="specialty" name="Specialty" placeholder="Select Specialty" class="jobs-filter-input"
                        multiple>

                        <?php

                        // Fetch the specialty options from the API
                        
                        $specialtyOptions = json_decode(file_get_contents('https://sharpjobs.azurewebsites.net/api/specialty'), true);

                        // Get the URL parameters and set them to empty Array if they are not provided
                        
                        // Initialize an empty array to store the values of the parameters
                        
                        $parameters = array(

                            'discipline' => [],

                            'specialty' => [],

                            'city' => [],

                            'state' => []

                        );



                        // Loop through each parameter
                        
                        foreach ($parameters as $param_name => $param_value) {

                            // Check if the parameter is set in the URL
                        
                            if (isset($_GET[$param_name])) {

                                // If the parameter is set, get its value(s)
                        
                                $param_values = $_GET[$param_name];



                                // If there is only one value, convert it to an array
                        
                                if (!is_array($param_values)) {

                                    $param_values = array($param_values);

                                }



                                // Update the value in the $parameters array
                        
                                $parameters[$param_name] = $param_values;

                            }

                        }

                        // Output the options
                        
                        foreach ($specialtyOptions as $option) {

                            $selected = in_array(strtolower($option['name']), explode(',', strtolower($parameters['specialty'][0]))) ? 'selected' : '';

                            echo "<option value=\"{$option['name']}\" $selected>{$option['name']}</option>";

                        }

                        ?>

                    </select>

                </div>

            </div>

            <div class="jobs-filter jobs-filter-city">

                <label for="city">City:</label>

                <select name="city" id="city" class="jobs-filter-input" multiple>

                </select>

            </div>

            <div class="jobs-filter jobs-filter-state">

                <label for="state">State:</label>

                <select name="state" id="state" class="jobs-filter-input" multiple>

                </select>

            </div>

            <div class="jobs-filter jobs-filter-lastmodified">

                <label for="last-modified">Last Modified:</label><br>

                <div class="mult-select-tag">

                    <div class="wrapper">

                        <div class="body shadow rounded">

                            <div class="input-container">

                                <?php

                                $lastmodified = $_GET['lastmodified'] ?? null;

                                echo "<input type=\"datetime-local\" id=\"last-modified\" name=\"last-modified\" id=\"last-modified\"

                class=\"jobs-filter-input\" value=\"{$lastmodified}\" />"

                                    ?>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

        <div class="jobs-search-results flex gap-6">

            <div class="jobs-container w-full md:w-2/4">
                <div class="jobs">


                    <?php

                    /*

                    Template Name: Sharp Medical Jobs API

                    */



                    // Get the URL parameters and set them to null if they are not provided
                    
                    // Initialize an empty array to store the values of the parameters
                    
                    $parameters = array(

                        'discipline' => null,

                        'specialty' => null,

                        'city' => null,

                        'state' => null,

                        'lastmodified' => null,

                    );

                    // Loop through each parameter
                    
                    foreach ($parameters as $param_name => $param_value) {

                        // Check if the parameter is set in the URL
                    
                        if (isset($_GET[$param_name])) {

                            // If the parameter is set, get its value(s)
                    
                            $param_values = $_GET[$param_name];



                            // If there is only one value, convert it to an array
                    
                            if (!is_array($param_values) && $param_name != 'lastmodified') {

                                $param_values = array($param_values);

                            }



                            // Update the value in the $parameters array
                    
                            $parameters[$param_name] = $param_values;

                        }

                    }



                    // Prepare the request body
                    
                    $requestBody = json_encode([

                        "LastModifiedDate" => $parameters['lastmodified'],

                        "Skip" => 0,

                        "Take" => 100,

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
                    
                    $firstJob = null;
                    if ($response === false) {

                        echo "Error: " . curl_error($ch);

                    } else {



                        $data = json_decode($response, true);

                        // // Output the response
                        $showMessageBox = '';

                        if ($data && isset($data['jobs']) && is_array($data['jobs']) && count($data['jobs']) > 0) {
                            $showMessageBox = 'hidden';

                            $firstJob = $data['jobs'][0];


                            foreach ($data['jobs'] as $job) {

                                $index = array_search($job, $data['jobs']);

                                $class = $index == 0 ? 'grid-listing-row current-selected-row sm:p-[1rem]' : 'grid-listing-row';

                                echo '<li ';

                                foreach ($job as $key => $value) {

                                    echo 'class="' . $class . '"' . 'data-' . $key . '="' . htmlspecialchars($value) . '"';

                                }

                                ;

                                echo '>';

                                echo '<div class="job-details flex flex-col gap-6 mb-2">';

                                echo '<div class="flex flex-col job-title-id">';

                                echo '<h3 class="text-lg font-bold">' . $job['title'] . '</h3>';

                                echo '<p><strong>Job ID:</strong> ' . $job['id'] . '</p>';

                                echo '</div>';

                                echo '<div class="flex gap-4 job-location flex-wrap">';

                                echo '<div class="flex flex-col">';

                                echo '<p><strong>Location:</strong> ' . $job['city'] . ', ' . $job['state'] . '</p>';

                                echo '</div>';

                                echo '<div class="flex flex-col job-shift">';

                                echo '<p><strong>Shift: </strong>' . $job['shift'] . '</p>';

                                echo '</div>';

                                echo '<div class="flex flex-col job-weekly-rate">';

                                echo '<p><strong>Weekly Rate:</strong> $' . number_format($job['weeklyRate'], 2) . '</p>';

                                echo '</div>';

                                echo '<div class="flex flex-col job-weekly-hours">';

                                echo '<p><strong>Weekly Hours:</strong> ' . $job['weeklyHours'] . '</p>';

                                echo '</div>';

                                echo '</div>';

                                echo '</div>';

                                echo '<a href="https://sharpmedicalstaffing.com/apply-to-travel-medical-job/?discipline=' . $job['discipline'] . '&speciality=' . $job['specialty'] . '&id=' . $job['id'] . '"target="_blank"><div class="interested-btn-container max-sm:flex md:hidden">';
                                echo '<button class="btn-gradient btn-lg rounded-pill hover-highlight quick-apply-submit-button">Interested</button></div></a>';

                                echo '</li>';

                            }




                        }

                    }
                    echo '</div>';
                    echo '<div class="border border-[#b3b3b3] border-solid rounded-xl message-box my-10 text-center p-2 bg-[#f4f5f6] justify-center items-center hidden' . ${$showMessageBox} . ' gap-2" role="alert">
                <span class="message">
                Sorry, we could not find any matching jobs for your search.
                </span>
                <span class="hidden loader"></span>
                

                </div>
                <div id="load-more-btn" class="justify-center items-center">
                </div>
                </div>';

                    if ($firstJob) {
                        echo '<div class="quick-apply-container-parent hidden w-full lg:w-2/4 lg:flex relative">';
                        echo '<div class="quick-apply-container quick-apply-container-fixed">';
                        echo '<div class="quick-apply-current-item px-[15px]"';
                        foreach ($firstJob as $key => $value) {
                            echo 'data-' . $key . '="' . htmlspecialchars($value) . '"';
                        }
                        echo '></div>';
                        echo '<div class="quick-apply-current-item-view">';
                        echo '<div class="quick-apply-job-title h3">' . $firstJob['title'] . '</div>';
                        echo '<div class="quick-apply-job-weekly-rate gradient-text h5"><strong>$' . number_format($firstJob['weeklyRate'], 2) . '</strong>' . ' wk' . '</div>';
                        echo '<div class="flex flex-wrap gap-4 mt-8">';
                        echo '<div class="quick-apply-job-location">' . '<strong>Location: </strong>' . $firstJob['city'] . ', ' . $firstJob['state'] . '</div>';
                        echo '<div class="quick-apply-job-shift">' . '<strong>Shift: </strong>' . $firstJob['shift'] . '</div>';
                        echo '<div class="flex flex-wrap gap-4">';
                        echo '<div class="quick-apply-job-start-date">' . '<strong>Start Date: </strong>' . (new DateTime($firstJob['start']))->format('m/d/Y h:i A') . '</div>';
                        echo '<div class="quick-apply-job-last-modified">' . '<strong>Last Updated: </strong>' . (new DateTime($firstJob['lastModifiedDate']))->format('m/d/Y h:i A') . '</div>';
                        echo '</div>';
                        echo '<div class="quick-apply-job-id w-full my-2"><strong>Job ID: </strong>' . $firstJob['id'] . '</div>';
                        echo '<div class="quick-apply-job-description my-2">' . '<strong>Description: </strong>' . $firstJob['description'] . '</div>';
                        echo '</div>';
                        echo '</div>';
                        echo '<div class="quick-apply-form mt-4">';

                        // First name and Last Name
                        echo '<div class="flex flex-wrap quick-apply-form-name-fields mb-2">';
                        echo '<div class="col-16 col-lg-6">';
                        echo '<input class="quick-apply-form-text-field w-full quick-apply-form-first-name" type="text" id="first_name" name="first_name" placeholder="First name *"></input>';
                        echo '</div>';
                        echo '<div class="col-16 col-lg-6">';
                        echo '<input class="quick-apply-form-text-field w-full quick-apply-form-last-name" type="text" id="last_name" name="last_name" placeholder="Last Name *"></input>';
                        echo '</div>';
                        echo '</div>';

                        // Email and Phone 
                        echo '<div class="flex flex-wrap quick-apply-form-contact-fields mb-2">';
                        echo '<div class="col-16 col-lg-6">';
                        echo '<input class="quick-apply-form-text-field w-full quick-apply-form-email" type="text" id="email" name="email" placeholder="Email address *"></input>';
                        echo '</div>';
                        echo '<div class="col-16 col-lg-6">';
                        echo '<input class="quick-apply-form-text-field w-full quick-apply-form-phone" type="text" id="phone" name="phone" placeholder="Phone *"></input>';
                        echo '</div>';
                        echo '</div>';

                        // Discipline and Specialty 
                        echo '<div class="flex flex-wrap quick-apply-form-discipline-specialty-fields mb-2">';
                        echo '<div class="col-16 col-lg-6">';
                        echo '<select class="quick-apply-form-select-field w-full quick-apply-form-job-title" name="job_title" id="job_title" ><option value="">Job title *</option>';
                        foreach ($disciplineOptions as $option) {
                            echo "<option value=\"{$option['name']}\">{$option['name']}</option>";

                        }
                        echo '</select>';
                        echo '</div>';
                        echo '<div class="col-16 col-lg-6">';
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
                        echo '<div class="quick-apply-submit flex flex-wrap justify-center items-center gap-4 mt-4 px-[15px]">
                        <div class="quick-apply-button-container flex max-w-[60%]">
                        <button class="btn-gradient btn-lg rounded-pill hover-highlight w-100 quick-apply-submit-button relative">
                        <span class="quick-apply-submit-text">Apply for this position</span>
                        <span class=""></span>
                        </button>
                        </div>
                        <div class="quick-apply-full-job-details-container flex max-w-2/4">
                        <a class="flex justify-center items-center underline quick-apply-full-job-details-link" href="https://sharpmedicalstaffing.com/apply-to-travel-medical-job/?discipline=' . $firstJob['discipline'] . '&specialty=' . $firstJob['specialty'] . '&id=' . $firstJob['id'] . '" target="_blank">See full job details</a></div>
                        </div>';
                        echo '</div>';
                        echo '</div>';
                        echo '</div>';
                    }

                    // Close cURL session
                    
                    curl_close($ch);

                    ?>



                </div>

            </div>



            <!-- Call Built In WordPress Footer  -->

            <?php get_footer(); ?>

</body>



</html>