# Using the Sora API with Kie.ai: A Comprehensive Guide

This guide provides a comprehensive overview of how to use OpenAI's Sora video generation API through the Kie.ai platform. Kie.ai offers a more affordable and accessible way to integrate Sora's powerful text-to-video and image-to-video capabilities into your projects. This document will cover the key advantages of using Kie.ai, a detailed pricing comparison, and a step-by-step guide to making your first API call.

## Why Use Kie.ai for Sora?

Kie.ai provides a compelling alternative to accessing the Sora API directly through OpenAI, primarily due to significant cost savings and additional features. By using Kie.ai, developers can benefit from a pricing model that is over **60% cheaper** than the official OpenAI API, without sacrificing performance or stability. Kie.ai also offers valuable features such as the option to remove watermarks, synchronized audio in generated videos, and a straightforward API that simplifies the integration process.

### Key Benefits

- **Significant Cost Savings**: Drastically reduce your video generation costs.
- **Synchronized Audio**: Generate videos with audio included.
- **No Watermark Option**: Flexibility to generate videos without watermarks.
- **Flexible Video Durations**: Choose between 10 and 15-second video lengths.
- **Multiple Quality Tiers**: Select from standard or high-definition (1080p) outputs.
- **Text-to-Video and Image-to-Video**: Support for both generation methods.

## Pricing Comparison

The following table illustrates the significant price difference between Kie.ai, OpenAI, and Fal.ai for accessing the Sora 2 API.

| Provider | Sora 2 | Sora 2 Pro (720P) | Sora 2 Pro (1080P) |
|---|---|---|---|
| **Kie.ai** ✅ | **$0.015 / s** | **$0.045 / s** | **$0.10-0.13 / s** |
| OpenAI | $0.10 / s | $0.30 / s | $0.50 / s |
| Fal.ai | $0.10 / s | $0.30 / s | $0.50 / s |

## Getting Started

Follow these steps to start using the Sora API with Kie.ai:

1.  **Sign Up**: Create a free account on the [Kie.ai website](https://kie.ai/).
2.  **Get Your API Key**: Navigate to the API Key Management section in your account dashboard to obtain your unique API key.
3.  **Make Your First API Call**: Use the provided API endpoints and your key to start generating videos.

## API Reference

### Authentication

All API requests must be authenticated using a Bearer Token. Include your API key in the `Authorization` header of your requests:

```
Authorization: Bearer YOUR_API_KEY
```

### Endpoints

There are two main endpoints for interacting with the Sora API on Kie.ai:

1.  **Create Task**: This endpoint is used to initiate a new video generation task.
    *   **URL**: `https://api.kie.ai/api/v1/jobs/createTask`
    *   **Method**: `POST`

2.  **Query Task**: This endpoint allows you to check the status and retrieve the results of a previously created task.
    *   **URL**: `https://api.kie.ai/api/v1/jobs/recordInfo`
    *   **Method**: `GET`

### Available Models

Kie.ai offers several models for different use cases:

-   `sora-2-text-to-video`: Standard text-to-video generation.
-   `sora-2-image-to-video`: Standard image-to-video generation.
-   `sora-2-pro-text-to-video`: Professional quality text-to-video generation.
-   `sora-2-pro-image-to-video`: Professional quality image-to-video generation.

### Request Parameters

When creating a new task, you can specify the following parameters in the JSON payload of your `POST` request:

#### Required Parameters

-   `model` (string): The name of the model you want to use (e.g., `"sora-2-text-to-video"`).
-   `input.prompt` (string): A text description of the video you want to create (maximum 10,000 characters).

#### Optional Parameters

-   `callBackUrl` (string): A URL where you can receive notifications upon task completion.
-   `input.aspect_ratio` (string): The aspect ratio of the video. Can be `"portrait"` or `"landscape"`.
-   `input.n_frames` (string): The duration of the video. Can be `"10"` (for 10 seconds) or `"15"` (for 15 seconds).
-   `input.remove_watermark` (boolean): Set to `true` to remove the watermark from the generated video.

## Python Code Examples

Here are some Python examples demonstrating how to use the Kie.ai Sora API.

### Create a Video Generation Task

```python
import requests
import json

# Your API key
api_key = "YOUR_API_KEY"

# API endpoint for creating a task
url = "https://api.kie.ai/api/v1/jobs/createTask"

# Headers for the request
headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {api_key}"
}

# Payload with the video generation parameters
payload = {
    "model": "sora-2-text-to-video",
    "callBackUrl": "https://your-domain.com/api/callback",
    "input": {
        "prompt": "A futuristic cityscape with flying cars and neon lights.",
        "aspect_ratio": "landscape",
        "n_frames": "10",
        "remove_watermark": True
    }
}

# Make the POST request
response = requests.post(url, headers=headers, data=json.dumps(payload))

# Print the response
if response.status_code == 200:
    result = response.json()
    print("Task created successfully:", result)
    # Example response:
    # {
    #   "code": 200,
    #   "message": "success",
    #   "data": {
    #     "taskId": "task_12345678"
    #   }
    # }
else:
    print("Error creating task:", response.text)

```

### Query the Task Status

```python
import requests

# Your API key
api_key = "YOUR_API_KEY"

# The ID of the task you want to query
task_id = "task_12345678"

# API endpoint for querying a task
url = "https://api.kie.ai/api/v1/jobs/recordInfo"

# Parameters for the request
params = {"taskId": task_id}

# Headers for the request
headers = {"Authorization": f"Bearer {api_key}"}

# Make the GET request
response = requests.get(url, headers=headers, params=params)

# Print the response
if response.status_code == 200:
    result = response.json()
    print("Task status:", result)
else:
    print("Error querying task:", response.text)
```

## Conclusion

Kie.ai provides a powerful and cost-effective solution for developers and creators looking to leverage the capabilities of OpenAI's Sora model. With its simple API, competitive pricing, and valuable features, Kie.ai is an excellent choice for integrating high-quality video generation into your applications and workflows.

---

*This document was created by Manus AI based on information from the Kie.ai website.*
