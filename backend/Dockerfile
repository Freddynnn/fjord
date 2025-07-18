# Use official Python runtime
FROM python:3.11-slim

# Set workdir inside container
WORKDIR /app

# Copy requirements first to leverage caching
COPY requirements.txt .

# Install dependencies
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy the rest of the code
COPY . .

# Expose port Django runs on
EXPOSE 8000

# Run Django dev server (adjust for prod later)
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
